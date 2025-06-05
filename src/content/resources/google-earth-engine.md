---
title: "Google Earth Engine (GEE) Resources"
description: "Access and resources for using Google Earth Engine at the University of Chicago"
type: "tool"
tags: ["gee", "remote sensing", "cloud computing"]
featured: true
---

# Google Earth Engine (GEE) Resources

Google Earth Engine (GEE) is a cloud-based platform that revolutionizes geospatial analysis by combining a vast catalog of satellite imagery and geospatial datasets with powerful analytical capabilities. This tool has become essential for researchers, scientists, and students across various disciplines at the University of Chicago.

## Key Features

### Data Catalog
- Petabytes of satellite imagery (Landsat, Sentinel, MODIS, etc.)
- Climate and weather datasets
- Global elevation and terrain data
- Nighttime lights and population data

### Processing Capabilities
- Cloud-based processing
- Parallel computation
- Time series analysis
- Machine learning integration

## Accessing GEE at UChicago

### Eligibility
- Current UChicago faculty, staff, and students
- Must have a UChicago email address
- Research or academic use only

### Getting Started
1. **Sign Up**
   - Visit [Earth Engine Signup](https://signup.earthengine.google.com/)
   - Use your UChicago email
   - Select "University of Chicago" as your institution

2. **Access Methods**
   - Web-based Code Editor
   - Python API
   - JavaScript API

3. **Authentication**
   - OAuth 2.0 with UChicago credentials
   - Service accounts for automated workflows

## Tutorials and Learning Resources

### Getting Started
- [GEE Documentation](https://developers.google.com/earth-engine)
- [GEE Code Editor Guide](https://developers.google.com/earth-engine/guides/playground)
- [GEE Python API Guide](https://developers.google.com/earth-engine/guides/python_install)

### UChicago-Specific Resources
- [RCC GEE Workshop Materials](https://rcc.uchicago.edu/)
- [Example Scripts Repository](https://github.com/uchicago-library/gee-examples)
- [Tutorial Videos](https://rcc.uchicago.edu/resources/video-tutorials/)

### Online Courses
- [Coursera: GIS Data Acquisition](https://www.coursera.org/learn/gis-data)
- [edX: Big Data, Artificial Intelligence, and Ethics](https://www.edx.org/course/big-data-artificial-intelligence-and-ethics)
- [Google Earth Engine User Summit](https://sites.google.com/view/eeus2022)

## Common Use Cases

### Research Applications
- Land cover/land use change detection
- Time series analysis of environmental variables
- Natural hazard monitoring and assessment
- Agricultural monitoring and yield prediction
- Urban growth analysis

### Example Code Snippets

#### Load and Display Landsat 8 Imagery
```javascript
// Load a Landsat 8 image collection
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SRT')
    .filterDate('2020-01-01', '2021-01-01')
    .filterBounds(geometry);

// Create a median composite
var composite = landsat.median();

// Display the composite
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Landsat 8');
```

#### Calculate NDVI
```javascript
// Calculate NDVI from Landsat 8
var ndvi = composite.normalizedDifference(['B5', 'B4']).rename('NDVI');

// Add NDVI layer to map
Map.addLayer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
```

## Best Practices

### Data Management
- Use appropriate scale and projection
- Be mindful of computation limits
- Export results when needed
- Clean up temporary assets

### Performance Optimization
- Minimize the number of operations
- Use appropriate scale for analysis
- Leverage client vs. server operations
- Use appropriate data types

### Reproducibility
- Document all processing steps
- Include metadata in exports
- Version control your scripts
- Share code and data when possible

## Support and Help

### UChicago Resources
- **Research Computing Center (RCC)**
  - Email: rcc-help@uchicago.edu
  - Office Hours: Tuesdays 2-4 PM (Zoom)
  - [RCC Help Desk](https://rcc.uchicago.edu/support/helpdesk/)

- **Library GIS Services**
  - Email: gis@lib.uchicago.edu
  - Consultation Requests: [Library GIS](https://www.lib.uchicago.edu/research/scholar/gis/)

### Online Communities
- [GEE Developer Forum](https://groups.google.com/g/google-earth-engine-developers)
- [GIS Stack Exchange](https://gis.stackexchange.com/questions/tagged/google-earth-engine)
- [GitHub Issues](https://github.com/google/earthengine-api/issues)

## Data Export and Integration

### Export Options
- Google Drive
- Google Cloud Storage
- Asset export
- Direct download (small datasets)

### Integration with Other Tools
- Python: earthengine-api, geemap
- R: rgee
- QGIS: GEE Plugin
- Jupyter notebooks

## Training and Workshops

### Upcoming Workshops
- Introduction to GEE (Monthly)
- Advanced GEE Analysis (Quarterly)
- GEE for Environmental Science (Fall Quarter)

### Custom Training
- Departmental workshops
- Research group training
- One-on-one consultations

## Policies and Compliance

### Data Usage
- Follow data provider terms of service
- Attribute data sources properly
- Be aware of any redistribution restrictions

### Compute Quotas
- Default processing limits apply
- Request quota increases for large projects
- Monitor your usage

### Data Privacy
- Do not upload sensitive data
- Be aware of spatial resolution and privacy
- Follow UChicago data security policies

## Case Studies

### Urban Heat Island Analysis
- Used Landsat thermal bands
- Analyzed 10-year temperature trends
- Identified heat vulnerability hotspots

### Agricultural Monitoring
- Monitored crop health
- Predicted yields
- Detected irrigation patterns

### Deforestation Tracking
- Mapped forest loss
- Identified drivers of deforestation
- Monitored conservation areas

## Additional Resources

### Documentation
- [GEE Developer Guide](https://developers.google.com/earth-engine/guides)
- [GEE API Reference](https://developers.google.com/earth-engine/apidocs)
- [GEE Data Catalog](https://developers.google.com/earth-engine/datasets)

### Example Scripts
- [GEE Code Editor Examples](https://code.earthengine.google.com/)
- [Awesome GEE](https://github.com/gee-community/awesome-google-earth-engine)
- [GEE Community Tutorials](https://www.youtube.com/c/GoogleEarthEngine)

### Related Tools
- Google Earth Studio
- Google Maps Platform
- Google Cloud Geospatial

## Contact
For GEE-related questions and support:
- Email: gee-support@uchicago.edu
- Office: John Crerar Library, Room 134
- Hours: Monday-Friday, 10:00 AM - 4:00 PM
