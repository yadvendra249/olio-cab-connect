import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface LocationPickerProps {
  label: string;
  value: string;
  onChange: (location: string, isValid: boolean) => void;
  error?: string;
  touched?: boolean;
  apiKey?: string;
}

const LocationPicker = ({ label, value, onChange, error, touched, apiKey }: LocationPickerProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const searchLocation = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using a more reliable public token - users should add their own Mapbox token
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `country=IN&` +
        `types=place,locality,neighborhood,address&` +
        `limit=5&` +
        `access_token=${apiKey || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      
      const data = await response.json();
      
      // Filter only Indian locations
      const indianLocations = data.features?.filter((feature: any) => 
        feature.context?.some((ctx: any) => ctx.id?.includes('country') && ctx.short_code === 'in')
      ) || [];
      
      setSuggestions(indianLocations);
    } catch (error) {
      console.error('Location search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue, false);
    
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      searchLocation(newValue);
    }, 300);
  };

  const handleSelectLocation = (location: any) => {
    onChange(location.place_name, true);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <Label>{label} *</Label>
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Search Indian locations..."
          className={`pl-10 ${touched && error ? 'border-destructive' : ''}`}
        />
      </div>
      
      {isLoading && (
        <div className="absolute z-10 w-full mt-1 bg-card border rounded-md p-2 shadow-lg">
          <p className="text-sm text-muted-foreground">Searching...</p>
        </div>
      )}
      
      {suggestions.length > 0 && !isLoading && (
        <div className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectLocation(location)}
              className="w-full text-left px-4 py-2 hover:bg-accent transition-colors"
            >
              <p className="text-sm font-medium text-foreground">{location.text}</p>
              <p className="text-xs text-muted-foreground">{location.place_name}</p>
            </button>
          ))}
        </div>
      )}
      
      {touched && error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default LocationPicker;
