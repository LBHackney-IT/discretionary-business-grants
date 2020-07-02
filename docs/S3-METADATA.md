# Fixing Mime Types in AWS

## The Issue

Part of the application process requires users to upload supporting documentation for their claims. E.G: Annual Accounts.  
During processing these files are then reviewed by Grant Officers.

The upload functionality does not set the file-type metadata correctly. Files are all set as "binary/octet-stream". This means that when a Grant Officer wishes to view a file, the browser doesn't know how to display it and forces a download instead of viewing in a new tab.

The files are stored in an AWS s3 bucket and there are nearly ten thousand to process. While it is possible to manually update the content-type, it is clearly not practical.

Programmatically the aws tools do not permit a metadata update. You have to copy the file over itself while setting the correct data.

## The Solution

Be warned that there are solutions on the [internet](https://stackoverflow.com/questions/23548256/how-can-i-change-the-content-type-of-an-object-using-aws-cli) that don't tell the whole story. You must provide a map of any extra metadata you require or it will be **lost** on copying. (Tested!)

In addition to setting the correct content type, the system requires a metadata key pair:
`"x-amz-meta-description":"user@email.com"`. This exists and is set correctly in the current implementation.

## Warnings and Disclaimer

- Following this guide is at your own risk. Ensure you have adequate back-ups.
- The following guide will copy **every** file over itself, so a backup is strongly recommended.
- A new "directory" called `archive` will be created at the root of the s3 bucket. A separate back-up bucket should be considered.

## Requirements

- [AWS cli tools](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) configured to login via Hackney [SSO](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html).
- Other tools are standard linux command line tools.

## Steps

1. Log in to the AWS cli on the command line.
1. Create a local list of all the files in the bucket.  
   `aws s3 ls s3://your-bucket-name/ --recursive --profile your-aws-cli-profile > my-bucket-ls.txt` 1. See [my-bucket-ls.txt](my-bucket-ls.txt) for example output.
1. Trim the first 2 columns from the listing. Required information is in the s3 keys.  
   `cat my-bucket-ls.txt | cut -c 32- > my-bucket-ls-trimmed.txt`
1. Get a list of all the file extensions.  
   `cat my-bucket-ls-trimmed.txt | grep -o -E '\.[[:alpha:]]{1,}$' | sort | uniq > my-bucket-extensions.txt`
   1. Review the [buildcps.sh](buildcps.sh) script to ensure extensions are covered. Unhandled extensions will have the mime type: `binary/octet-stream`.
1. Generate the AWS cp commands
   1. Edit [buildcps.sh](buildcps.sh) setting values for:
   - `input=` The `*-ls-trimmed.txt` file from above.
   - `bucket=` The AWS s3 bucket.
   - `aws_profile=` your-aws-cli-profile.
   1. Make the script executable:  
      `chmod +x buildcps.sh`
   1. Run, redirecting the commands to a new file.  
      `./buildcps.sh > awscp.txt`
   1. Review the generated commands in `awscp.txt`.
1. **Backup** the original files to an archive dir in the same bucket.  
   **Note:** The command uses the `--dryrun` argument to permit validation. Remove to actually execute.  
   `aws s3 cp s3://your-bucket-name/ s3://your-bucket-name/archive/ --recursive --dryrun --profile your-aws-cli-profile` 1. Go to the AWS console and manually check the files are archived.
1. Run the generated commands against s3, redirecting output to a log file.  
   `xargs -d '\n' -t -i bash -c '{}' < awscp.txt > awscp_log.txt` 1. **Optional:** If `awscp.txt` is large, [split](https://kb.iu.edu/d/afar) it into a number of files to run smaller batches. The previous `xargs` command will need adjusting for each output file.  
    `split -l 500 awscp.txt awscp_`

1. Manually check the files Metadata in the AWS console.
