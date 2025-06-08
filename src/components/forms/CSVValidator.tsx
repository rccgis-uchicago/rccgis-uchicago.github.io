'use client';

import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';

type CSVValidationResult = {
  isValid: boolean;
  message: string;
  format: 'multi-column' | 'single-column' | null;
  headers?: string[];
  sampleData?: string[][];
  errors?: string[];
};

interface CSVValidatorProps {
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  validationResult: CSVValidationResult | null;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function CSVValidator({
  onFileUpload,
  validationResult,
  isLoading,
  fileInputRef,
}: CSVValidatorProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (fileInputRef.current) {
        // Create a new FileList with the dropped file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        
        // Trigger the change event
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', {
          writable: false,
          value: { files: dataTransfer.files }
        });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Upload CSV File</h3>
        <p className="text-sm text-gray-600">
          Upload a CSV file containing addresses to validate. The first row should contain column headers.
        </p>
        
        <div 
          className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
            isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            <svg
              className={`mx-auto h-12 w-12 ${
                isDragging ? 'text-primary-400' : 'text-gray-400'
              }`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".csv,text/csv"
                  onChange={onFileUpload}
                  ref={fileInputRef}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">CSV up to 10MB</p>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}

      {validationResult && (
        <div className={`p-4 rounded-md ${
          validationResult.isValid ? 'bg-green-50' : 'bg-yellow-50'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {validationResult.isValid ? (
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${
                validationResult.isValid ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {validationResult.message}
              </h3>
              
              {validationResult.errors && validationResult.errors.length > 0 && (
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationResult.sampleData && validationResult.sampleData.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Data (first {validationResult.sampleData.length} rows):</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {validationResult.headers?.map((header, index) => (
                            <th 
                              key={index}
                              scope="col" 
                              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {validationResult.sampleData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                {cell || <span className="text-gray-300">-</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-blue-800">RCC-GIS Geocoding Service CSV Requirements</h3>
        <div className="mt-3 space-y-4">
          <div>
            <h4 className="font-medium text-blue-700">Accepted Column Headers</h4>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-blue-700">
              <div className="flex items-start">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">ID</span>
                <span className="ml-2 text-sm">Record identifier</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">ADDRESS</span>
                <span className="ml-2 text-sm">Street address (required)</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">CITY</span>
                <span className="ml-2 text-sm">City name</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">REGION/STATE/ST</span>
                <span className="ml-2 text-sm">State/Province</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">POSTAL/ZIP</span>
                <span className="ml-2 text-sm">Postal/ZIP code</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">COUNTRYCODE/CC</span>
                <span className="ml-2 text-sm">Country code (e.g., US, CA)</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-200 pt-3">
            <h4 className="font-medium text-blue-700">Format Options</h4>
            <div className="mt-2 space-y-4">
              <div className="bg-white p-3 rounded border border-blue-100">
                <h5 className="font-medium">Option 1: Multi-column (Recommended)</h5>
                <pre className="mt-1 bg-gray-50 p-2 text-xs overflow-x-auto">
{`ID,ADDRESS,CITY,REGION,POSTAL,COUNTRYCODE
1,123 Main St,Chicago,IL,60601,US
2,456 Oak Ave,Portland,OR,97201,US`}
                </pre>
                <p className="mt-1 text-xs text-blue-600">• Only ADDRESS is required, but more columns improve accuracy</p>
              </div>
              
              <div className="bg-white p-3 rounded border border-blue-100">
                <h5 className="font-medium">Option 2: Single-column</h5>
                <pre className="mt-1 bg-gray-50 p-2 text-xs overflow-x-auto">
{`ADDRESS
"123 Main St, Chicago, IL 60601, US"
"456 Oak Ave, Portland, OR 97201, US"`}
                </pre>
                <p className="mt-1 text-xs text-blue-600">• Must include complete address in one column</p>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-blue-600 border-t border-blue-200 pt-3">
            <p className="font-medium">Notes:</p>
            <ul className="mt-1 space-y-1">
              <li>• File must be in UTF-8 encoding</li>
              <li>• First row must contain column headers</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Only the first 20 rows will be processed for validation</li>
            </ul>
            <p className="mt-2 text-blue-500">
              For more information about batch geocoding formats, see{' '}
              <a 
                href="https://developers.arcgis.com/documentation/mapping-and-location-services/geocoding/batch-geocoding/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                ArcGIS Batch Geocoding Documentation
              </a>
            </p>
          </div>
        </div>
        <div className="mt-3">
          <a 
            href="/images/example_us_address.csv" 
            download="example_addresses.csv"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Example CSV
          </a>
        </div>
      </div>
    </div>
  );
}
