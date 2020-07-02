#!/bin/bash
input="./my-bucket-ls-trimmed.txt"
bucket="s3://your-bucket-name/"
aws_profile='--profile your-aws-cli-profile'
mime="binary/octet-stream"


function mime_type_for() {

  shopt -s nocasematch

  case $1 in
    '.bmp')
    mime='image/bmp'
    ;;
    '.csv' )
    mime='text/csv'
    ;;
    '.doc')
    mime='application/msword'
    ;;
    '.docx')
    mime='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ;;
    '.docm' )
    mime='application/vnd.ms-word.document.macroEnabled.12'
    ;;
    '.jpg' | '.jpeg' )
    mime='image/jpeg'
    ;;
    '.gif')
    mime='image/gif'
    ;;
    '.htm' | '.html' )
    mime='image/jpeg'
    ;;
    '.msg' )
    mime='application/vnd.ms-outlook'
    ;;
    '.numbers' )
    mime='application/x-iwork-numbers-sffnumbers'
    ;;
    '.odt' )
    mime='application/vnd.oasis.opendocument.text'
    ;;
    '.pdf')
    mime='application/pdf'
    ;;
    '.png')
    mime='image/png'
    ;;
    '.pptx')
    mime='application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ;;
    '.rtf')
    mime='application/rtf'
    ;;
    '.tif' | '.tiff')
    mime='image/tiff'
    ;;
    '.txt' )
    mime='text/plain'
    ;;
    '.heic')
    mime='image/heic'
    ;;
    '.xhtml')
    mime='application/xhtml+xml'
    ;;
    '.xls' )
    mime='application/vnd.ms-excel'
    ;;
    '.xlsm')
    mime='application/vnd.ms-excel.sheet.macroenabled.12'
    ;;
    '.xlsx')
    mime='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ;;
    '.zip')
    mime='application/zip'
    ;;
    *)
    mime="binary/octet-stream"
    ;;
    esac

    shopt -u nocasematch
}


while IFS= read -r filename
do
  email=$(awk 'BEGIN { FS = "/" } ; { print $1 }' <<<$filename)
  mime_type_for $(grep -o -E '\.[[:alpha:]]{1,}$' <<<$filename)
  echo "aws s3 cp \"$bucket$filename\" \"$bucket$filename\" --content-type=\"$mime\" --metadata-directive=\"REPLACE\" --metadata '{\"x-amz-meta-description\":\"$email\"}' $aws_profile"
done < "$input"
