/**
 * Navigation configuration for the RCC-GIS website
 * 
 * Note: Dynamic routes (like /services/[slug] and /projects/[slug]) are automatically
 * generated based on content collections and should not be hardcoded here.
 * Only top-level and static routes should be included in this configuration.
 */

type NavItem = {
  href: string;
  label: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
};

export const mainNav: NavItem[] = [
  { 
    href: '/', 
    label: 'Home',
    description: 'Welcome to RCC-GIS at the University of Chicago'
  },
  { 
    href: '/services', 
    label: 'Services',
    description: 'Explore our professional GIS services and solutions',
    children: [
      { 
        href: '/services/computing', 
        label: 'Computing Resources',
        description: 'High-performance computing for spatial analysis'
      },
      { 
        href: '/services/geocoding', 
        label: 'Geocoding',
        description: 'Address validation and geocoding services'
      },
      {
        href: '/services/geocoding-demo',
        label: 'Address Formatting Guide',
        description: 'How to prepare addresses for geocoding'
      },
      { 
        href: '/services/arcgis', 
        label: 'ArcGIS Platform',
        description: 'Enterprise GIS solutions and support'
      },
      { 
        href: '/services/arcgis-service-plan', 
        label: 'ArcGIS Service Plan',
        description: 'Licensing and support plans for ArcGIS'
      }
    ]
  },
  { 
    href: '/projects', 
    label: 'Projects',
    description: 'Featured GIS projects and research initiatives',
    children: [
      { 
        href: '/projects/webgis', 
        label: 'WebGIS Applications',
        description: 'Interactive web mapping solutions'
      },
      { 
        href: '/projects/geoai', 
        label: 'GeoAI Research',
        description: 'AI and machine learning for geospatial analysis'
      }
    ]
  },
  { 
    href: '/workshops', 
    label: 'Workshops',
    description: 'Training and educational opportunities',
    children: [
      { 
        href: '/workshops/upcoming', 
        label: 'Upcoming Workshops',
        description: 'Register for our next training session'
      },
      { 
        href: '/workshops/past', 
        label: 'Past Workshops',
        description: 'Materials and recordings from previous workshops'
      },
      { 
        href: '/workshops/tutorials', 
        label: 'Tutorials',
        description: 'Self-paced learning resources',
        children: [
          { href: '/tutorials/arcgis-pro', label: 'ArcGIS Pro' },
          { href: '/tutorials/qgis', label: 'QGIS' },
          { href: '/tutorials/python', label: 'Python for GIS' },
          { href: '/tutorials/web-mapping', label: 'Web Mapping' }
        ]
      }
    ]
  },
  { 
    href: '/resources', 
    label: 'Resources',
    description: 'Tools, data, and reference materials',
    children: [
      { 
        href: '/resources/software', 
        label: 'Software',
        description: 'GIS and spatial analysis tools'
      },
      { 
        href: '/resources/data', 
        label: 'Data Collections',
        description: 'Spatial datasets and resources'
      },
      { 
        href: '/resources/lab-facilities', 
        label: 'Lab Facilities',
        description: 'Available equipment and workspaces'
      },
      { 
        href: '/resources/imagery', 
        label: 'Imagery',
        description: 'Satellite and aerial imagery sources'
      },
      { 
        href: '/resources/google-earth-engine', 
        label: 'Earth Engine',
        description: 'Google Earth Engine resources',
        external: true
      }
    ]
  },
  { 
    href: '/about', 
    label: 'About Us',
    description: 'Learn about our team, mission, and partnerships',
    children: [
      { 
        href: '/about/team', 
        label: 'Our Team',
        description: 'Meet our expert GIS team and researchers'
      },
      { 
        href: '/about/mission', 
        label: 'Mission & Values',
        description: 'Our commitment to advancing spatial research'
      },
      { 
        href: '/about/partners', 
        label: 'Partners',
        description: 'Academic and industry collaborations'
      },
      { 
        href: '/about/join', 
        label: 'Join Us',
        description: 'Career and collaboration opportunities'
      }
    ]
  },
  { 
    href: '/contact', 
    label: 'Contact',
    description: 'Get in touch with our team',
    children: [
      { 
        href: '/contact#support', 
        label: 'Get Support',
        description: 'Submit a support request'
      },
      { 
        href: '/contact#consulting', 
        label: 'Consulting',
        description: 'Schedule a consultation'
      },
      { 
        href: '/contact#directions', 
        label: 'Directions',
        description: 'Find our location on campus'
      },
      { 
        href: 'mailto:gis-help@rcc.uchicago.edu', 
        label: 'Email Us',
        description: 'gis-help@rcc.uchicago.edu',
        external: true
      }
    ]
  },
  { 
    href: '/getting-started', 
    label: 'Get Started',
    description: 'New to RCC-GIS? Start here',
    children: [
      { 
        href: '/getting-started/account', 
        label: 'Request an Account',
        description: 'Get access to our resources'
      },
      { 
        href: '/getting-started/orientation', 
        label: 'Orientation',
        description: 'New user guide and resources'
      },
      { 
        href: '/getting-started/faq', 
        label: 'FAQ',
        description: 'Frequently asked questions'
      }
    ]
  }
];

// Export individual sections for use in components
export const resourcesNav = mainNav.find(item => item.label === 'Resources')?.children || [];
export const servicesNav = mainNav.find(item => item.label === 'Services')?.children || [];
export const projectsNav = mainNav.find(item => item.label === 'Projects')?.children || [];
export const workshopsNav = mainNav.find(item => item.label === 'Workshops')?.children || [];

// Helper function to get all navigation items as a flat array
export const getAllNavItems = (items: NavItem[] = mainNav): NavItem[] => {
  return items.reduce<NavItem[]>((acc, item) => {
    acc.push(item);
    if (item.children) {
      acc.push(...getAllNavItems(item.children));
    }
    return acc;
  }, []);
};

// Find a navigation item by path
export const findNavItemByPath = (path: string): NavItem | undefined => {
  const allItems = getAllNavItems();
  return allItems.find(item => item.href === path);
};

// Generate breadcrumbs for a given path
export const getBreadcrumbs = (currentPath: string): { label: string; href: string }[] => {
  const breadcrumbs: { label: string; href: string }[] = [];
  
  const findPath = (items: NavItem[], pathParts: string[]): boolean => {
    for (const item of items) {
      if (item.href === `/${pathParts.join('/')}`) {
        breadcrumbs.push({ label: item.label, href: item.href });
        return true;
      }
      
      if (item.children) {
        if (findPath(item.children, pathParts)) {
          breadcrumbs.push({ label: item.label, href: item.href });
          return true;
        }
      }
    }
    return false;
  };
  
  // Remove leading slash and split into parts
  const pathParts = currentPath.replace(/^\/+/, '').split('/');
  
  // Try to find the deepest matching path
  while (pathParts.length > 0) {
    if (findPath(mainNav, pathParts)) {
      break;
    }
    pathParts.pop();
  }
  
  // Add home as the first breadcrumb
  breadcrumbs.push({ label: 'Home', href: '/' });
  
  // Reverse to get the correct order (home -> parent -> current)
  return breadcrumbs.reverse();
};