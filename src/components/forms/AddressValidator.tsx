'use client';

import { useState, useRef, type FormEvent, type ChangeEvent } from 'react';
import AddressForm from './AddressForm';
import CSVValidator from './CSVValidator';

type ValidationResult = {
  isValid: boolean;
  message: string;
  suggestions?: string[];
};

type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type CSVValidationResult = {
  isValid: boolean;
  message: string;
  format: 'multi-column' | 'single-column' | null;
  headers?: string[];
  sampleData?: string[][];
  errors?: string[];
};

export default function AddressValidator() {
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'csv'>('csv');
  const [csvValidation, setCsvValidation] = useState<CSVValidationResult | null>(null);
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAddress = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app, this would call your validation API
      const mockValidation = Math.random() > 0.3; // 70% chance of valid
      
      if (mockValidation) {
        setResult({
          isValid: true,
          message: '✓ Address is valid and ready for geocoding!',
        });
      } else {
        setResult({
          isValid: false,
          message: '⚠️ Address needs attention',
          suggestions: [
            'Verify street number and name',
            'Check for typos in the city name',
            'Ensure postal code matches the city/state',
          ],
        });
      }
    } catch (error) {
      setResult({
        isValid: false,
        message: '❌ Error validating address. Please try again.',
      });
      console.error('Validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear previous results when editing
    if (result) setResult(null);
  };

  const loadExample = () => {
    setAddress({
      street: '5801 S Ellis Ave',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60637',
      country: 'US',
    });
    setResult(null);
  };

  // Map of acceptable header variations to their canonical form
  const headerMappings: Record<string, string> = {
    'id': 'ID',
    'address': 'ADDRESS',
    'neighborhood': 'NEIGHBORHOOD',
    'city': 'CITY',
    'subregion': 'SUBREGION',
    'region': 'REGION',
    'state': 'REGION',
    'st': 'REGION',
    'postal': 'POSTAL',
    'zip': 'POSTAL',
    'zipcode': 'POSTAL',
    'country': 'COUNTRYCODE',
    'countrycode': 'COUNTRYCODE',
    'cc': 'COUNTRYCODE'
  };

  const validateCsvHeaders = (headers: string[], format: 'multi-column' | 'single-column'): { 
    isValid: boolean; 
    errors: string[];
    canonicalHeaders?: Record<string, string>;
  } => {
    const errors: string[] = [];
    const canonicalHeaders: Record<string, string> = {};
    
    if (format === 'single-column') {
      // For single column, we just need one column with any header
      if (headers.length === 0) {
        return {
          isValid: false,
          errors: ['CSV file must have at least one column containing addresses']
        };
      }
      return { isValid: true, errors: [], canonicalHeaders: { [headers[0].toLowerCase()]: 'ADDRESS' } };
    }
    
    // For multi-column, check for valid headers
    const lowerCaseHeaders = headers.map(h => h.toLowerCase());
    const usedStandardHeaders = new Set<string>();
    
    headers.forEach(header => {
      const lowerHeader = header.toLowerCase();
      if (headerMappings[lowerHeader]) {
        const standardHeader = headerMappings[lowerHeader];
        canonicalHeaders[header] = standardHeader;
        usedStandardHeaders.add(standardHeader);
      } else {
        errors.push(`Unrecognized column header: "${header}"`);
      }
    });
    
    // Check for minimum required headers
    if (!usedStandardHeaders.has('ADDRESS')) {
      errors.push('CSV must contain at least an ADDRESS column');
    }
    
    // Suggest additional useful columns
    const suggestedColumns = [
      !usedStandardHeaders.has('CITY') ? 'CITY' : null,
      !usedStandardHeaders.has('REGION') ? 'REGION/STATE' : null,
      !usedStandardHeaders.has('POSTAL') ? 'POSTAL/ZIP' : null,
      !usedStandardHeaders.has('COUNTRYCODE') ? 'COUNTRYCODE' : null
    ].filter(Boolean);
    
    if (suggestedColumns.length > 0) {
      errors.push(
        `For better results, consider adding: ${suggestedColumns.join(', ')}`
      );
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      canonicalHeaders: Object.keys(canonicalHeaders).length > 0 ? canonicalHeaders : undefined
    };
  };

  const parseCSV = (text: string, rowLimit = 20): { 
    headers: string[]; 
    rows: string[][]; 
    totalRows: number;
    format: 'multi-column' | 'single-column';
    canonicalHeaders?: Record<string, string>;
  } => {
    const lineIterator = text.split('\n').filter(line => line.trim() !== '');
    if (lineIterator.length === 0) return { headers: [], rows: [], totalRows: 0, format: 'multi-column' };
    
    // Process headers
    const headers = lineIterator[0].split(',').map(h => h.trim());
    
    // Detect format based on number of columns
    const isSingleColumn = headers.length === 1 || 
                         (headers.length === 2 && headers[1] === ''); // Handle potential trailing comma
    
    const format = isSingleColumn ? 'single-column' : 'multi-column';
    
    // Process data rows with limit
    const rows: string[][] = [];
    let totalRows = 0;
    
    for (let i = 1; i < lineIterator.length && rows.length < rowLimit; i++) {
      const line = lineIterator[i].trim();
      if (line === '') continue;
      
      // Handle quoted values that might contain commas
      const row = [];
      let inQuotes = false;
      let currentField = '';
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      row.push(currentField.trim()); // Add the last field
      
      // If single column format, ensure we only take the first column
      if (isSingleColumn) {
        rows.push([row[0]]);
      } else {
        rows.push(row);
      }
      
      totalRows++;
    }
    
    const result = { 
      headers: isSingleColumn ? ['Address'] : headers, 
      rows, 
      totalRows: Math.max(totalRows, lineIterator.length - 1),
      format: isSingleColumn ? 'single-column' as const : 'multi-column' as const
    };
    
    // Only add canonical headers for multi-column format
    if (!isSingleColumn) {
      const { canonicalHeaders } = validateCsvHeaders(headers, 'multi-column');
      if (canonicalHeaders) {
        return { ...result, canonicalHeaders };
      }
    }
    
    return result;
  };

  const validateCsvFormat = async (content: string) => {
    const { headers, rows, totalRows, format, canonicalHeaders } = parseCSV(content);
    
    // Get up to 5 sample rows (or fewer if the file is smaller)
    const sampleData = rows.slice(0, 5);
    
    // Show a warning if the file was truncated
    const truncated = totalRows > rows.length;
    const rowLimitMessage = truncated 
      ? ` (showing first ${rows.length} of ${totalRows} rows)` 
      : '';
    
    // Validate based on format
    const { isValid, errors: validationErrors } = validateCsvHeaders(headers, format);
    
    // Combine validation errors with truncation warning if needed
    const allErrors = [...(validationErrors || [])];
    if (truncated) {
      allErrors.push(`Note: Only the first ${rows.length} rows were processed for validation.`);
    }
    
    // Add format info to the message
    let formatInfo: string;
    if (format === 'single-column') {
      formatInfo = 'Single-address column format detected';
    } else {
      const usedHeaders = Object.values(canonicalHeaders || {});
      const headerCount = usedHeaders.length;
      const requiredHeaders = ['ADDRESS'];
      const hasAllRequired = requiredHeaders.every(h => usedHeaders.includes(h));
      
      formatInfo = `Multi-column format detected (${headerCount} valid column${headerCount !== 1 ? 's' : ''})`;
      
      if (!hasAllRequired) {
        allErrors.unshift('Missing required ADDRESS column');
      }
    }
    
    return {
      isValid,
      format,
      message: isValid 
        ? `CSV file is properly formatted! (${formatInfo})${rowLimitMessage}` 
        : 'There are issues with the CSV format',
      headers,
      sampleData: sampleData.map(row => 
        format === 'single-column' && row.length > 0 
          ? [row[0], '', '', '', ''] // Ensure consistent columns for display
          : row
      ),
      errors: allErrors.length > 0 ? allErrors : undefined
    };
  };

  const handleCsvUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous validation
    setCsvValidation(null);
    setIsCsvLoading(true);

    try {
      // Check file type
      if (!file.name.endsWith('.csv')) {
        setCsvValidation({
          isValid: false,
          message: 'Please upload a CSV file',
          format: null,
          errors: ['Only CSV files are supported']
        });
        return;
      }

      const content = await file.text();
      const result = await validateCsvFormat(content);
      setCsvValidation(result);
    } catch (error) {
      console.error('Error processing CSV:', error);
      setCsvValidation({
        isValid: false,
        message: 'Error processing CSV file',
        format: null,
        errors: ['An error occurred while processing the file']
      });
    } finally {
      setIsCsvLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Address Validator</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('single')}
            className={`${activeTab === 'single' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Single Address
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`${activeTab === 'csv' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            CSV File Validation
          </button>
        </nav>
      </div>

      {activeTab === 'single' ? (
        <AddressForm
          address={address}
          result={result}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={validateAddress}
          onLoadExample={loadExample}
        />
      ) : (
        <CSVValidator
          onFileUpload={handleCsvUpload}
          validationResult={csvValidation}
          isLoading={isCsvLoading}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  );
}
