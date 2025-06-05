---
title: "Address Formatting Guide"
description: "Learn how to properly format addresses for the RCC-GIS Geocoding Service"
---

# Address Formatting Guide

Before uploading your CSV file for geocoding, please ensure your addresses are properly formatted. This guide will help you prepare your data for successful geocoding.

## Address Format Example

Here's an example of a properly formatted address:

```
STREET: 5801 S Ellis Ave
CITY: Chicago
STATE: IL
POSTAL: 60637
COUNTRY: US
```

## Address Format Requirements

1. **Required Fields**:
   - `STREET`: Street number and name (e.g., 5801 S Ellis Ave)
   - `CITY`: City or locality name (e.g., Chicago)
   - `STATE`: State/province code (e.g., IL for Illinois)
   - `POSTAL`: ZIP/Postal code (e.g., 60637)
   - `COUNTRY`: Two-letter country code (e.g., US, CA, GB)

2. **Optional Fields**:
   - `NEIGHBORHOOD`: Neighborhood or district name
   - `SUBREGION`: County or sub-region name

## Common Formatting Issues

| Issue | Example | Corrected |
|-------|---------|-----------|
| Missing street number | Main St | 123 Main St |
| Full state name | California | CA |
| Inconsistent abbreviations | Street, St, Str | St |
| Missing postal code | - | 60637 |
| Non-standard characters | 123 Main St #4B | 123 Main St, Unit 4B |

## Tips for Better Results

- Use standard abbreviations (St, Ave, Blvd, etc.)
- Avoid special characters when possible
- Ensure city names match official postal records
- Verify postal codes are correct for the given city/state
- For international addresses, include the correct country code

## Example CSV Format

```csv
ID,STREET,CITY,STATE,POSTAL,COUNTRY
1,5801 S Ellis Ave,Chicago,IL,60637,US
2,1200 E California Blvd,Pasadena,CA,91125,US
3,1 Queen's Rd,London,,SW1A 1AA,GB
```

## Need Help?

If you're having trouble formatting your addresses, please contact [GIS Help](mailto:gis-help@rcc.uchicago.edu) for assistance.

## Tips for Successful Validation

- Include as much address information as possible
- Use standard abbreviations (e.g., "St" instead of "Street")
- Verify postal codes match the city/state
- Check for typos in city and street names
- For US addresses, use the two-letter state code (e.g., "IL" for Illinois)

## Common Issues

- **Incomplete Addresses**: Missing street numbers, city, or postal code
- **Typos**: Common in street names and city names
- **Incorrect Formatting**: Using full state names instead of codes, or vice versa
- **Special Characters**: Some special characters might cause validation issues

## Next Steps

Once your addresses are properly formatted, you can:

1. [Upload your CSV file](/services/geocoding) for batch processing
2. Review the [geocoding documentation](/docs/geocoding) for advanced options
3. [Contact support](/contact) if you need assistance with large datasets

<Callout type="info">
  This demo validates address formatting only. For actual geocoding, please use the full service with your CSV file.
</Callout>
