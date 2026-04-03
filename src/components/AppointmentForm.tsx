import { useState, useEffect } from 'react';
import { Calendar, MapPin, Phone, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { APPOINTMENT_FUNCTION_URL } from '@/config';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const SERVICE_OPTIONS = [
  { value: 'residential', label: 'Residential Moving' },
  { value: 'commercial', label: 'Commercial Moves' },
  { value: 'long_distance', label: 'Long-Distance Moving' },
  { value: 'packing', label: 'Packing & Unpacking Services' },
  { value: 'specialty', label: 'Specialty Items (Pianos, Safes, etc.)' },
  { value: 'other', label: 'Other' },
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    destinationAddress: '', 
    date: '',
    serviceType: '', 
    otherService: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  
  // Track which address field is currently being typed in
  const [activeAddressField, setActiveAddressField] = useState<'address' | 'destinationAddress' | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  // Fetch suggestions based on the active field
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!activeAddressField) return;

      const query = formData[activeAddressField].trim();
      
      // Wait until they've typed at least 3 characters
      if (query.length < 3) {
        setAddressSuggestions([]);
        return;
      }

      setIsFetching(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query + ', Nova Scotia, Canada'
        )}&format=json&limit=5`;

        const res = await fetch(url, {
          headers: { 'User-Agent': 'MovingNerdsApp/1.0 (movingnerds.ca)' },
        });

        if (!res.ok) throw new Error("Rate limited or server error");

        const data = await res.json();
        
        // Handle empty results gracefully
        if (data.length === 0) {
           setAddressSuggestions([{ place_id: 'none', display_name: 'No exact matches found. Keep typing or enter manually.' }]);
        } else {
           setAddressSuggestions(data);
        }
      } catch (err) {
        console.error('Error fetching address suggestions:', err);
        setAddressSuggestions([]);
      } finally {
        setIsFetching(false);
      }
    };

    // 800ms debounce to prevent hitting OpenStreetMap API rate limits
    const timeout = setTimeout(fetchSuggestions, 800);
    return () => clearTimeout(timeout);
  }, [formData.address, formData.destinationAddress, activeAddressField]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!APPOINTMENT_FUNCTION_URL) {
      console.warn('APPOINTMENT_FUNCTION_URL is not set. Update src/config.ts.');
      toast({
        title: 'Not configured',
        description: 'Set your GCP function URL in src/config.ts',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.serviceType) {
      toast({
        title: 'Select a service',
        description: 'Please choose a moving service.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.serviceType === 'other' && !formData.otherService.trim()) {
      toast({
        title: 'Provide details for "Other"',
        description: 'Please describe the other service you need.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const otherAppend = formData.serviceType === 'other'
        ? `\nOther service: ${formData.otherService}`
        : '';

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        destinationAddress: formData.destinationAddress,
        preferredDate: formData.date
          ? format(parseLocalDate(formData.date), "yyyy-MM-dd")
          : "",
        services: [formData.serviceType], 
        description: `${formData.description || ''}${otherAppend}`.trim(),
      };

      const response = await axios.post(APPOINTMENT_FUNCTION_URL, payload);

      if (response.status === 200 || response.status === 201) {
        toast({
          title: 'Move Requested!',
          description: "We'll contact you shortly to confirm details, destination, and provide a firm estimate.",
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          destinationAddress: '',
          date: '',
          serviceType: '',
          otherService: '',
          description: '',
        });
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Book Your Move</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="(000) 000-0000"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                {/* Current Address */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-700">Moving From (Current Address) *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="123 Main St, Halifax"
                      value={formData.address}
                      onChange={(e) => {
                        updateField('address', e.target.value);
                        setActiveAddressField('address');
                      }}
                      onFocus={() => setActiveAddressField('address')}
                      disabled={isSubmitting}
                      className="pl-10"
                      required
                    />
                  </div>

                  {/* Dropdown for Current Address */}
                  {activeAddressField === 'address' && addressSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full shadow-lg max-h-48 overflow-auto">
                      {addressSuggestions.map((s, i) => (
                        <li
                          key={s.place_id}
                          onClick={() => {
                            if (s.place_id !== 'none') {
                              updateField('address', s.display_name);
                            }
                            setAddressSuggestions([]);
                            setActiveAddressField(null);
                          }}
                          className={`px-3 py-2 text-sm ${
                            s.place_id !== 'none' 
                              ? 'cursor-pointer hover:bg-orange-50' 
                              : 'cursor-default text-gray-500 italic'
                          } ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          {s.display_name}
                        </li>
                      ))}
                      {isFetching && <li className="px-3 py-2 text-gray-500 text-sm">Loading...</li>}
                    </ul>
                  )}
                </div>

                {/* Destination Address */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-700">Moving To (Destination Address) *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="456 Oak St, Halifax"
                      value={formData.destinationAddress}
                      onChange={(e) => {
                        updateField('destinationAddress', e.target.value);
                        setActiveAddressField('destinationAddress');
                      }}
                      onFocus={() => setActiveAddressField('destinationAddress')}
                      disabled={isSubmitting}
                      className="pl-10"
                      required
                    />
                  </div>

                  {/* Dropdown for Destination Address */}
                  {activeAddressField === 'destinationAddress' && addressSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full shadow-lg max-h-48 overflow-auto">
                      {addressSuggestions.map((s, i) => (
                        <li
                          key={s.place_id}
                          onClick={() => {
                            if (s.place_id !== 'none') {
                              updateField('destinationAddress', s.display_name);
                            }
                            setAddressSuggestions([]);
                            setActiveAddressField(null);
                          }}
                          className={`px-3 py-2 text-sm ${
                            s.place_id !== 'none' 
                              ? 'cursor-pointer hover:bg-orange-50' 
                              : 'cursor-default text-gray-500 italic'
                          } ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          {s.display_name}
                        </li>
                      ))}
                      {isFetching && <li className="px-3 py-2 text-gray-500 text-sm">Loading...</li>}
                    </ul>
                  )}
                </div>
                
                {/* Preferred Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Preferred Move Date *</label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-6 text-gray-400" />
                        <Input
                          readOnly
                          value={formData.date ? format(parseLocalDate(formData.date), "MMMM d, yyyy") : ""}
                          placeholder="Select your target moving date"
                          className="pl-10 cursor-pointer bg-white"
                          required
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-2 bg-white shadow-md rounded-lg w-[350px]">
                      <DayPicker
                        mode="single"
                        selected={formData.date ? parseLocalDate(formData.date) : undefined}
                        onSelect={(date) => {
                          if (date) updateField("date", format(date, "yyyy-MM-dd"));
                          setDateOpen(false);
                        }}
                        disabled={{ before: new Date() }}
                        modifiersClassNames={{
                          disabled: "text-gray-400 bg-gray-100 cursor-not-allowed",
                          today: "font-bold text-orange-600",
                          selected: "bg-orange-600 text-white rounded-full",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Type of Move *</label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(v) => updateField('serviceType', v)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select a moving service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Other service detail */}
                {formData.serviceType === 'other' && (
                  <div className="pl-1 pt-2">
                    <label className="text-sm font-medium text-gray-700">Other service *</label>
                    <Input
                      value={formData.otherService}
                      onChange={(e) => updateField('otherService', e.target.value)}
                      placeholder="Describe the other moving service you need"
                      disabled={isSubmitting}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Move Details</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Include details like home size (e.g., 2-bedroom apt), access (stairs/elevators at either location), and any exceptionally heavy items."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full overflow-hidden rounded-xl bg-orange-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-orange-700 hover:shadow-orange-600/30 focus-visible:ring-2 focus-visible:ring-offset-2 ${isSubmitting ? 'opacity-90' : ''}`}
              >
                {isSubmitting ? 'Submitting Request...' : 'Get Your Free Moving Quote'}
              </Button>

              <p className="text-xs text-center text-gray-500">No credit card required • No obligation</p>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-center text-blue-800 font-medium">
                💡 Free on-site estimates • Fully licensed & insured • Expert handling
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentForm;