---
title: "Offline Geocoding on Midway2"
description: "Step-by-step guide for setting up and running offline geocoding using ArcPy and ArcGIS Server on Midway2"
type: "tutorial"
tags: ["geocoding", "midway2", "arcgis", "offline"]
featured: true
---

# Offline Geocoding on Midway2

> **Note:** This guide is specifically for the Midway2 high-performance computing environment at the University of Chicago.

## Overview
This guide provides instructions for setting up and running offline geocoding using ArcPy and ArcGIS Server on the Midway2 environment. This is particularly useful for processing large batches of addresses without relying on external geocoding services.

## Prerequisites
- Active Midway2 account
- Access to RCC resources
- Basic familiarity with Linux command line
- ArcGIS Server installation files (available to UChicago affiliates)

## Installation

### 1. Obtain ArcGIS Server Files
Download the ArcGIS Server package from the UChicago Box link provided in your welcome email or contact RCC support.

### 2. Prepare the Environment
```bash
# Navigate to your home directory
cd ~

# Unpack the ArcGIS installation package
tar xvzf ArcGIS_for_Server_Linux_xxxx_xxxxxx.tar.gz

# Increase the maximum number of open files (required by ArcGIS)
ulimit -n 65535
```

### 3. Run the Installation
```bash
# Navigate to the setup directory
cd ~/ArcGISServer/Linux

# Make the setup file executable
chmod +x Setup

# Run the installer
./Setup
```

### 4. Configure Environment Variables
Add the following to your `~/.bashrc` or `~/.bash_profile`:

```bash
# ArcGIS Server
export AGSSERVER=/path/to/arcgis/server
export PATH=$AGSSERVER/tools:$PATH

# Python environment
export PYTHONPATH=$AGSSERVER/arcpy:$PYTHONPATH
```

## Setting Up for Geocoding

### 1. Prepare Your Address Data
Ensure your address data is in a compatible format (CSV, Excel, or database table) with properly formatted address fields.

### 2. Create a Python Script
Create a new Python script (e.g., `geocode.py`) with the following template:

```python
import arcpy
from arcpy import env
import os

# Set workspace
env.workspace = "/path/to/your/workspace"

# Set up the geocoding service
arcpy.AddToolbox("C:/path/to/geocoding/service.ags")

# Input address table
in_table = "addresses.csv"

# Output feature class
out_feature_class = "geocoded_addresses.shp"

# Geocode addresses
arcpy.GeocodeAddresses_geocoding(
    in_table,
    "Street Address VISIBLE NONE;City VISIBLE NONE;State VISIBLE NONE;ZIP VISIBLE NONE",
    out_feature_class,
    "",
    ""
)

print("Geocoding completed successfully!")
```

### 3. Submit Job to Midway2
Use the following SLURM script to submit your geocoding job:

```bash
#!/bin/bash
#SBATCH --job-name=geocoding
#SBATCH --output=geocoding_%j.out
#SBATCH --time=04:00:00
#SBATCH --partition=broadwl
#SBATCH --ntasks=1
#SBATCH --mem=16G

# Load required modules
module load python/3.8

# Run the geocoding script
python geocode.py
```

## Best Practices

### Performance Optimization
- Process addresses in batches
- Use appropriate coordinate systems
- Monitor resource usage

### Error Handling
- Implement try-except blocks
- Log errors to a file
- Validate input data

### Data Management
- Clean addresses before geocoding
- Store results in a geodatabase
- Document processing steps

## Troubleshooting

### Common Issues
1. **Permission Denied**
   - Ensure you have execute permissions on all directories
   - Check file ownership

2. **Memory Errors**
   - Reduce batch size
   - Request more memory in your SLURM script

3. **Geocoding Failures**
   - Verify address formatting
   - Check for special characters
   - Validate against reference data

## Support

### Getting Help
- RCC Help Desk: rcc-help@uchicago.edu
- GIS Support: gis-support@uchicago.edu

### Documentation
- [ArcGIS Server Documentation](https://enterprise.arcgis.com/en/server/)
- [RCC User Guide](https://rcc.uchicago.edu/docs/)
- [Midway2 Documentation](https://rcc.uchicago.edu/docs/)

## Example Workflow

### 1. Prepare Data
```bash
# Create a directory for your project
mkdir -p ~/geocoding_project/data
cd ~/geocoding_project

# Copy your address data
cp /path/to/your/addresses.csv data/
```

### 2. Create Configuration File
Create a `config.json` file:
```json
{
  "input_file": "data/addresses.csv",
  "output_file": "output/geocoded.shp",
  "batch_size": 1000,
  "crs": "EPSG:4326"
}
```

### 3. Run the Geocoding
```bash
# Submit the job
sbatch run_geocoding.sh

# Check job status
squeue -u $USER
```

## Advanced Topics

### Parallel Processing
For large datasets, consider using parallel processing:

```python
import multiprocessing

def process_batch(batch):
    # Your geocoding logic here
    pass

if __name__ == '__main__':
    # Split data into batches
    batches = split_into_batches(addresses, batch_size=1000)
    
    # Process in parallel
    with multiprocessing.Pool(processes=4) as pool:
        results = pool.map(process_batch, batches)
```

### Quality Assessment
- Calculate match scores
- Visualize geocoding results
- Compare with reference data

## Maintenance

### Updating Reference Data
1. Download latest TIGER/Line files
2. Update your geocoding service
3. Validate with test addresses

### Monitoring
- Set up job monitoring
- Track success/failure rates
- Monitor system resources

## Security Considerations
- Keep sensitive data secure
- Follow UChicago data policies
- Use secure file transfers
- Regularly update software

## Additional Resources
- [ArcGIS Geocoding Documentation](https://pro.arcgis.com/en/pro-app/tool-reference/geocoding/geocoding-tool-reference.htm)
- [RCC Training Materials](https://rcc.uchicago.edu/training/)
- [UChicago Library GIS Services](https://www.lib.uchicago.edu/research/scholar/gis/)

## Contact
For additional support:
- Email: gis-support@uchicago.edu
- Office: Crerar Library, Room 201
- Hours: Monday-Friday, 9:00 AM - 5:00 PM
