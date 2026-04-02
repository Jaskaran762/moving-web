import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, User, Mail, Check, ChevronsUpDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { APPOINTMENT_FUNCTION_URL } from '@/config';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';


const SERVICE_OPTIONS = [
  { value: 'furniture', label: 'Furniture Removal' },
  { value: 'appliances', label: 'Appliance Pickup' },
  { value: 'electronics', label: 'Electronic Waste' },
  { value: 'construction', label: 'Construction Debris' },
  { value: 'household', label: 'Household Cleanout' },
  { value: 'yard', label: 'Yard Waste' },
  { value: 'other', label: 'Other' },
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    serviceTypes: [] as string[],
    otherService: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { toast } = useToast();

  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleServiceType = (value: string, checked: boolean) => {
    setFormData(prev => {
      const set = new Set(prev.serviceTypes);
      if (checked) set.add(value);
      else set.delete(value);
      return { ...prev, serviceTypes: Array.from(set) };
    });
  };

  const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d); // normal JS date (local midnight)
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = formData.address.trim();
      if (query.length < 2) {
        setAddressSuggestions([]);
        return;
      }

      setIsFetching(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query + ' Nova Scotia Canada'
        )}&format=json&limit=5`;

        const res = await fetch(url, {
          headers: { 'User-Agent': 'JunkNerdsApp/1.0 (junknerds.ca)' },
        });

        const data = await res.json();
        setAddressSuggestions(data);
      } catch (err) {
        console.error('Error fetching address suggestions:', err);
      } finally {
        setIsFetching(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [formData.address]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validations before hitting network
    if (!APPOINTMENT_FUNCTION_URL) {
      console.warn('APPOINTMENT_FUNCTION_URL is not set. Update src/config.ts.');
      toast({
        title: 'Not configured',
        description: 'Set your GCP function URL in src/config.ts',
        variant: 'destructive',
      });
      return;
    }

    if (formData.serviceTypes.length === 0) {
      toast({
        title: 'Select at least one service',
        description: 'Please choose one or more service types.',
        variant: 'destructive',
      });
      return;
    }

    if (
      formData.serviceTypes.includes('other') &&
      !formData.otherService.trim()
    ) {
      toast({
        title: 'Provide details for "Other"',
        description: 'Please describe the other service you need.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const otherAppend = formData.serviceTypes.includes('other')
        ? `\nOther service: ${formData.otherService}`
        : '';

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        preferredDate: formData.date
          ? format(parseLocalDate(formData.date), "yyyy-MM-dd")
          : "",
        preferredTime: formData.time,
        services: formData.serviceTypes,
        description: `${formData.description || ''}${otherAppend}`.trim(),
      };

      const response = await axios.post(APPOINTMENT_FUNCTION_URL, payload);

      if (response.status === 200 || response.status === 201) {
        toast({
          title: 'Appointment Requested!',
          description:
            "We'll contact you within 24 hours to confirm your appointment and provide a free estimate.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          date: '',
          time: '',
          serviceTypes: [],
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
            <CardTitle className="text-2xl">Book an Appointment</CardTitle>
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
                    />
                  </div>
                </div>
                {/* Address with suggestions */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-700">Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="123 Main St, Halifax"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10"
                    />
                  </div>

                  {addressSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full shadow-lg max-h-48 overflow-auto">
                      {addressSuggestions.map((s, i) => (
                        <li
                          key={s.place_id}
                          onClick={() => {
                            updateField('address', s.display_name);
                            setAddressSuggestions([]);
                          }}
                          className={`px-3 py-2 cursor-pointer text-sm hover:bg-green-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                            }`}
                        >
                          {s.display_name}
                        </li>
                      ))}
                      {isFetching && (
                        <li className="px-3 py-2 text-gray-500 text-sm">Loading...</li>
                      )}
                    </ul>
                  )}
                </div>
                {/* Preferred Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Preferred Date *</label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-6 text-gray-400" />
                        <Input
                          readOnly
                          value={formData.date ? format(parseLocalDate(formData.date), "MMMM d, yyyy") : ""}
                          placeholder="Select a date"
                          className="pl-10 cursor-pointer bg-white"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="p-2 bg-white shadow-md rounded-lg w-[350px]"
                    >
                      <DayPicker
                        mode="single"
                        selected={formData.date ? parseLocalDate(formData.date) : undefined}
                        onSelect={(date) => {
                          if (date) updateField("date", format(date, "yyyy-MM-dd"));
                          setDateOpen(false);
                        }}
                        disabled={{
                          before: new Date(),
                          after: new Date(new Date().setMonth(new Date().getMonth() + 2)),
                        }}
                        modifiersClassNames={{
                          disabled: "text-gray-400 bg-gray-100 cursor-not-allowed",
                          today: "font-bold text-green-600",
                          selected: "bg-green-600 text-white rounded-full",
                        }}
                      />

                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Preferred Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Select
                      value={formData.time}
                      onValueChange={(v) => updateField('time', v)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select a time window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</SelectItem>
                        <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                        <SelectItem value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</SelectItem>
                        <SelectItem value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</SelectItem>
                        <SelectItem value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Service Types (Multi-select Combobox) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Service Type(s) * <span className="text-gray-500">(select all that apply)</span>
                </label>

                <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex min-h-10 w-full items-center gap-2 rounded-md border bg-background px-3 py-2 text-left text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {formData.serviceTypes.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {formData.serviceTypes.map((val) => {
                            const opt = SERVICE_OPTIONS.find((o) => o.value === val);
                            if (!opt) return null;
                            return (
                              <Badge key={val} variant="secondary" className="px-2 py-1">
                                {opt.label}
                                <X
                                  className="ml-1 h-3.5 w-3.5 cursor-pointer opacity-60 hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleServiceType(val, false);
                                  }}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Select services...</span>
                      )}
                      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search services..." />
                      <CommandEmpty>No services found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {SERVICE_OPTIONS.map((opt) => {
                            const checked = formData.serviceTypes.includes(opt.value);
                            return (
                              <CommandItem
                                key={opt.value}
                                value={opt.label}
                                keywords={[opt.label]}
                                onSelect={() => toggleServiceType(opt.value, !checked)}
                                className="flex items-center gap-2"
                              >
                                <div
                                  aria-hidden
                                  className="mr-1 flex h-4 w-4 items-center justify-center rounded-sm border"
                                >
                                  {checked && <Check className="h-3 w-3" />}
                                </div>
                                <span>{opt.label}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>

                      <Separator />

                      <div className="flex items-center justify-between gap-2 p-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              serviceTypes: SERVICE_OPTIONS.map((o) => o.value),
                            }))
                          }
                        >
                          Select all
                        </Button>
                        <div className="space-x-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setFormData((prev) => ({ ...prev, serviceTypes: [] }))}
                          >
                            Clear
                          </Button>
                          <Button type="button" size="sm" onClick={() => setServicesOpen(false)}>
                            Done
                          </Button>
                        </div>
                      </div>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Other service detail */}
                {formData.serviceTypes.includes('other') && (
                  <div className="pl-1">
                    <label className="text-sm font-medium text-gray-700">
                      Other service *
                    </label>
                    <Input
                      value={formData.otherService}
                      onChange={(e) => updateField('otherService', e.target.value)}
                      placeholder="Describe the other service you need"
                      disabled={isSubmitting}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description of Items</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Please describe the items, approximate quantity, access (stairs/elevator), parking notes, etc."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              {/* Fancy CTA Button with glow/shine */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full
                  overflow-hidden rounded-xl bg-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition
                  hover:bg-green-700 hover:shadow-green-600/30 focus-visible:ring-2 focus-visible:ring-offset-2
                  ${isSubmitting ? 'opacity-90' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
              </Button>

              <p className="text-xs text-center text-gray-500">No credit card required • No obligation</p>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-center text-blue-800 font-medium">
                💡 Free estimates • Same-day service available • Fully insured
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentForm;
