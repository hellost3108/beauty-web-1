export const DELIVERY_STORAGE_KEY = 'melalogy-checkout-delivery';

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  note: string;
}

export const emptyDeliveryDetails: DeliveryDetails = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  ward: '',
  district: '',
  city: '',
  note: '',
};

export function isDeliveryDetails(value: unknown): value is DeliveryDetails {
  if (!value || typeof value !== 'object') return false;

  const details = value as Partial<DeliveryDetails>;
  return [
    details.fullName,
    details.phone,
    details.email,
    details.address,
    details.ward,
    details.district,
    details.city,
  ].every((field) => typeof field === 'string' && field.trim().length > 0);
}

export function readDeliveryDetails(): DeliveryDetails | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(DELIVERY_STORAGE_KEY);
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    return isDeliveryDetails(parsed)
      ? { ...emptyDeliveryDetails, ...parsed }
      : null;
  } catch {
    return null;
  }
}

export function saveDeliveryDetails(details: DeliveryDetails) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify(details));
}

export function clearDeliveryDetails() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(DELIVERY_STORAGE_KEY);
}
