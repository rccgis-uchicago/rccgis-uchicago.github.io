---
title: "Satellite Imagery Resources"
description: "Comprehensive guide to satellite imagery sources and applications for GIS at University of Chicago"
type: "dataset"
client: "University of Chicago RCC"
status: "available"
tags: ["satellite imagery", "remote sensing", "gis", "data sources"]
featured: true
image: "/images/resources/imagery-cover.jpg"
startDate: 2021-01-01
---

# Satellite Imagery Resources

Satellite imagery is a crucial data source for many GIS applications. The University of Chicago's Research Computing Center (RCC) provides access to various imagery sources for academic researchers.

## Available Imagery Sources

### Global Coverage
- **Landsat Archive**  
  *Resolution:* 30m (15m pan-sharpened)  
  *Temporal Coverage:* 1972-Present  
  *Access:* Free through USGS EarthExplorer  
  *Special Features:* Longest continuous global observation record

- **Sentinel-2**  
  *Resolution:* 10m-60m  
  *Temporal Coverage:* 2015-Present  
  *Access:* Free through Copernicus Open Access Hub  
  *Special Features:* High revisit rate (5 days), 13 spectral bands

- **MODIS**  
  *Resolution:* 250m-1000m  
  *Temporal Coverage:* 2000-Present  
  *Access:* Free through NASA Earthdata  
  *Special Features:* Daily global coverage, excellent for time series analysis

### High-Resolution Imagery
- **NAIP (National Agriculture Imagery Program)**  
  *Resolution:* 1m  
  *Temporal Coverage:* Annually for agricultural areas  
  *Access:* Free through USDA Geospatial Data Gateway  
  *Special Features:* Leaf-on imagery, 4-band (RGB + NIR)

- **ASTER Global DEM Data**  
  *Resolution:* 30m  
  *Coverage:* Global  
  *Access:* Free through NASA Earthdata  
  *Special Features:* Digital elevation models with 1 arc-second resolution

- **Digital Globe Satellite Imagery**  
  *Resolution:* Up to 30cm  
  *Coverage:* Global  
  *Access:* Commercial, available through RCC  
  *Special Features:* Very high resolution, frequent updates

### Specialized Datasets
- **ESA Global Land Cover**  
  *Resolution:* 300m  
  *Coverage:* Global  
  *Access:* Free through ESA CCI  
  *Special Features:* Annual land cover maps since 1992

## Applications in GIS

### Common Applications
- Land use and land cover mapping
- Urban planning and development monitoring
- Agricultural yield estimation
- Disaster response and damage assessment
- Environmental monitoring
- Climate change studies

### Key Considerations
- **Spatial resolution**: Level of detail in the imagery
- **Spectral resolution**: Number and width of spectral bands
- **Temporal resolution**: How often the same area is imaged
- **Atmospheric corrections**: Required for accurate analysis
- **Image classification techniques**: Methods for extracting information

## Access and Support

RCC provides support and resources for working with these imagery sources in GIS applications. Contact our team for assistance with accessing or processing satellite imagery:

- Email: [gis-help@rcc.uchicago.edu](mailto:gis-help@rcc.uchicago.edu)
- [Contact Form](/contact/)
- [Support Portal](/support/)

## Training and Resources

RCC offers various training on GIS every year. Additional training is also provided by library GIS services. Check our [workshops page](/workshops/) for upcoming training sessions.

## Need Help?

For questions about satellite imagery or assistance with GIS projects, please contact the RCC GIS team at [gis-help@rcc.uchicago.edu](mailto:gis-help@rcc.uchicago.edu).

## Access Methods

### Web Portals
- **UChicago Research Computing Portal**  
  Pre-processed datasets, institutional access to commercial imagery

- **Earthdata Search**  
  NASA's interface for satellite data discovery and access

- **Copernicus Open Access Hub**  
  European Space Agency's Sentinel satellite data

- **USGS EarthExplorer**  
  Access to Landsat, historical aerial photography, and more

### Programmatic Access
- **Google Earth Engine**  
  Cloud-based platform for planetary-scale analysis
  ```javascript
  // Example: Load and display Landsat 8 imagery
  var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate('2020-01-01', '2021-01-01')
      .filterBounds(geometry);
  ```

- **Microsoft Planetary Computer**  
  Cloud-optimized geospatial datasets

## Processing Tools
- **Desktop Software**
  - QGIS with SCP Plugin
  - ArcGIS Pro
  - ENVI

- **Cloud Platforms**
  - Google Earth Engine
  - Microsoft Planetary Computer
  - AWS Earth

- **Programming Libraries**
  - Python: Rasterio, GDAL, xarray
  - R: terra, stars
  - JavaScript: Geemap, Leaflet

## Best Practices
1. **Data Selection**
   - Choose appropriate resolution for your analysis
   - Consider temporal requirements
   - Check cloud cover and image quality

2. **Pre-processing**
   - Atmospheric correction
   - Cloud masking
   - Mosaicking and reprojection

3. **Storage**
   - Use cloud-optimized formats (COG, ZARR)
   - Implement proper metadata documentation
   - Consider data retention policies

## Training Resources
- **Workshops**
  - Introduction to Remote Sensing
  - Time Series Analysis
  - Machine Learning with Satellite Imagery

- **Online Courses**
  - Coursera: Remote Sensing Specialization
  - edX: Earth Observation from Space
  - NASA ARSET Training

## Support
- **Consultations**
  - Data discovery assistance
  - Processing workflow design
  - Technical troubleshooting

- **Documentation**
  - Processing guides
  - Code examples
  - Best practices

## Data Citation
Please ensure proper attribution when using satellite imagery in your research. Example:
> Landsat 8 image courtesy of the U.S. Geological Survey

## Contact
For assistance with satellite imagery:
- Email: gis-imagery@uchicago.edu
- Office: Research Computing Center, Room 201
- Hours: Monday-Friday, 9:00 AM - 5:00 PM
