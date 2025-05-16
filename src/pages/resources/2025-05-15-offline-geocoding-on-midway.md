---
layout: "@layouts/MarkdownResourceLayout.astro"
title: Offline Geocoding on Midway
---
## **Offline Geocoding on Midway**

For **offline geocoding**, you need to run ArcPy scripts in the Midway or MidwayR environment. The following instructions will help you set up ArcPy on your home directory. ArcGIS Server needs to be located inside the user's home directory. So first, download the ArcGIS Server setup and copy it to your home folder.

**ArcGIS Server files:** [https://uchicago.box.com/s/ph58im9r9dd751zbgqq8r44fhy0ul2gu](https://uchicago.box.com/s/ph58im9r9dd751zbgqq8r44fhy0ul2gu)

These instructions explain the necessary steps for ArcGIS Server installation and how to test it with a simple ArcPy script.

* * *

### **ArcGIS Server Installation Steps ⚙️**

1.  **Unpack the ArcGIS installation package:**
    
    **Bash**
    
    ```
    tar xvzf ArcGIS_for_Server_Linux_xxxx_xxxxxx.tar.gz
    ```
    
2.  **Increase File Limits:** ArcGIS for Server requires you to increase the maximum number of open files.
    
    *   _Ref:_ [_http://server.arcgis.com/en/server/10.8/install/linux/arcgis-for-server-system-requirements.htm_](http://server.arcgis.com/en/server/10.8/install/linux/arcgis-for-server-system-requirements.htm)
        
    *   You will need to log in & log out for the changes to the limits to take effect.
        
3.  **Install ArcGIS for Server:** Now we are ready to actually install.
    
    **Bash**
    
    ```
    cd ArcGISServer/
    ./Setup -m silent -l Yes -a /home/<user>/provision_file_ArcGIS_Server.prvc
    ```
    
    *   The installation will take some minutes.
        

* * *

### **Environment Configuration 📝**

Once ArcGIS is installed, the environment needs to be configured.

1.  **Set ARCGISHOME variable:**
    
    **Bash**
    
    ```
    export ARCGISHOME=$HOME/arcgis/server
    ```
    
2.  **Using Python and ArcPy:** If you only need Python and ArcPy, you don't need to start the server. Note that you have to use ArcGIS's own Python installation instead of the default system installation. Python on ArcGIS Server for Linux runs a Windows version of Python under Wine.
    
3.  **Start the ArcGIS Python console with:**
    
    **Bash**
    
    ```
    /home/<user>/arcgis/server/tools/python
    ```
    
4.  **If it does not work, use Anaconda3 2019.03 module:**
    
    **Bash**
    
    ```
    module load Anaconda3/2019.03
    source activate arcpy
    ```
    
5.  **Test ArcPy:** Open Python and test if `'import arcpy'` works.
    

* * *

### **Geocoding Example 🗺️**

**Python**

```
import arcpy
from arcpy import env

# Set the workspace
env.workspace = "/home/pnsinha/Documents/Geocoding/atlanta.gdb" # Corrected path

# Create Address Locator
arcpy.CreateAddressLocator_geocoding(
    "US Address - Dual Ranges", 
    "streets Primary", 
    "'Feature ID' FeatureID VISIBLE NONE;'*From Left' L_F_ADD VISIBLE NONE;'*To Left' L_T_ADD VISIBLE NONE;'*From Right' R_F_ADD VISIBLE NONE;'*To Right' R_T_ADD VISIBLE NONE;'Prefix Direction' PREFIX VISIBLE NONE;'Prefix Type' PRE_TYPE VISIBLE NONE;'*Street Name' NAME VISIBLE NONE;'Suffix Type' TYPE VISIBLE NONE;'Suffix Direction' SUFFIX VISIBLE NONE;'Left City or Place' CITYL VISIBLE NONE;'Right City or Place' CITYR VISIBLE NONE;'Left Zipcode' ZIPL VISIBLE NONE;'Right Zipcode' ZIPR VISIBLE NONE;'Left State' State_Abbr VISIBLE NONE;'Right State' State_Abbr VISIBLE NONE", 
    "Atlanta_AddressLocator", 
    "", 
    "DISABLED"
)

# Define variables for GeocodeAddresses
address_table = "customer"
address_locator = "Atlanta_AddressLocator"
address_fields = "street Address; City City; State State; ZIP zip"
geocode_result = "geocode_result"

# Geocode Addresses
arcpy.GeocodeAddresses(
    address_table, 
    address_locator, 
    address_fields, 
    geocode_result, 
    'STATIC'
)
```

* * *

### **Spatial Packages on Midway 📦**

*   **GDAL:** GDAL and OGR are open-source software libraries for handling raster images and vector materials. In addition to the library, there are also command-line tools for handling data, such as changing file format and coordinate systems. The GDAL branch of the library handles raster data and OGR vector data. The library supports a very wide range of formats.
    
    *   **Using GDAL / OGR:**
        
        **Bash**
        
        ```
        module load gdal
        ```
        
*   **GEOS**
    
*   **GrADS**
    
*   **Grass**
    
*   **PROJ.4**
    
*   **QGIS**
    
*   **R**
    
*   **Python 2**
    
*   **Python 3**
    
*   **Julia**
    
*   **Matlab**
    
*   **Stata**
    
*   **SAS**
    
*   **IDL**
    
*   **PostGIS**
    

* * *

### **Remote Visualization 🖥️**

The **Remote Visualization system** provides simplified access to visualization software. It allows users to visualize data from their desktops/laptops quickly and efficiently and download the rendered images without having to download large data files.

Users can run numerous visualization and analysis packages from the Remote Visualization system, including:

*   Matlab
    
*   Matplotlib
    
*   GrADS
    
*   Octave
    
*   NetCDF applications