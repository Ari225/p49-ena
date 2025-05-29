
export const mobileStyles = {
  // Container styles
  container: {
    base: 'mx-auto px-4 sm:px-6',
    full: 'w-full',
    centered: 'max-w-sm mx-auto px-4'
  },

  // Spacing styles
  spacing: {
    section: 'py-8 sm:py-12',
    card: 'p-4 sm:p-6',
    tight: 'py-4',
    loose: 'py-12'
  },

  // Typography styles
  typography: {
    hero: 'text-2xl sm:text-3xl md:text-4xl font-bold',
    title: 'text-xl sm:text-2xl font-bold',
    subtitle: 'text-lg sm:text-xl font-semibold',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm'
  },

  // Button styles
  button: {
    primary: 'w-full sm:w-auto px-6 py-3 text-sm font-medium',
    secondary: 'w-full sm:w-auto px-4 py-2 text-xs font-medium',
    icon: 'p-2 sm:p-3'
  },

  // Layout styles
  layout: {
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
    flex: 'flex flex-col sm:flex-row gap-4',
    stack: 'space-y-4 sm:space-y-6'
  },

  // Card styles
  card: {
    base: 'bg-white rounded-lg shadow-md overflow-hidden',
    compact: 'p-3 sm:p-4',
    normal: 'p-4 sm:p-6',
    large: 'p-6 sm:p-8'
  },

  // Navigation styles
  navigation: {
    mobile: 'fixed bottom-0 left-0 right-0 bg-white border-t',
    desktop: 'hidden md:flex'
  },

  // Image styles
  image: {
    responsive: 'w-full h-auto object-cover',
    avatar: 'w-8 h-8 sm:w-10 sm:h-10 rounded-full',
    icon: 'w-5 h-5 sm:w-6 sm:h-6'
  }
};

export const getMobileClassName = (
  category: keyof typeof mobileStyles,
  variant: string
): string => {
  return mobileStyles[category][variant as keyof typeof mobileStyles[typeof category]] || '';
};
