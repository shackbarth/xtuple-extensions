### Logistify-xTuple Bridge
##### Open Source Logistics for Open Source ERP

Logistify is a very simple service for LTL rate quoting. Most LTL carriers
have their own API for fetching rates; with your account number, password,
from zip, to zip, class and weight, they'll give you an accurate quote for
your shipment. 

Logistify has done the pain for you of unifying all of those APIs so that
with a single call you can get the rates across all of your carriers. And
the xTuple-Logistify bridge makes it one step easier: you just need to 
click the "L" button in the xTuple sales order screen to pull the freight
details from the ERP and send it to Logistify. The response comes back
within seconds.

Necessary setup:
- Disable automatic calculation of freight
- Set freight codes to be valid NMFC freight codes 50-500
- Add carrier SCAC, account number, username, and password to Ship Via object
- You might want to remove default ship-via from your customers and ship-tos
