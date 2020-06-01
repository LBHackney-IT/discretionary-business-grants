/* 
* This is a short lived application - we will use an enum for speed to market.
*
* Should we need to edit the values - the mitigation would be to add to an enum value
* and block unwanted entries at the api level.
*/
CREATE TYPE rateable_limit_repsonse AS ENUM ('Yes', 'No', 'Not Applicable');
