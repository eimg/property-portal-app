export type ListingImage = { url: string; altText?: string | null; isPrimary?: boolean };

export type Listing = {
  id: string; slug: string; title: string; description: string; transactionType: "SALE" | "RENT"; status: string;
  priceMMK: number; currency: string; rentFrequency?: string | null; address?: string | null; bedrooms?: number | null; bathrooms?: number | null;
  buildingArea?: number | null; buildingAreaUnit?: string | null; landArea?: number | null; landAreaUnit?: string | null; furnished?: boolean | null; parkingCount?: number | null;
  isFeatured?: boolean; publishedAt?: string | null; createdAt?: string; images?: ListingImage[]; location?: { id?: string; name: string }; category?: { id?: string; name: string };
  latestModerationAction?: { action: string; reason?: string | null; createdAt: string } | null;
};

export type AuthUser = { id: string; email: string; name: string; roles: string[] };
export type CatalogItem = { id: string; name: string; slug: string; type?: string; parentId?: string | null };
export type Inquiry = { id: string; status: string; message: string; preferredContact: string; createdAt: string; listing?: { id?: string; slug: string; title: string }; customer?: { name: string; email: string; phone?: string | null } };
export type NewListing = { title: string; description: string; transactionType: "SALE" | "RENT"; priceMMK: number; currency: string; rentFrequency?: string; address: string; locationId: string; categoryId: string; bedrooms?: number; bathrooms?: number; buildingArea?: number; buildingAreaUnit?: string; landArea?: number; landAreaUnit?: string; furnished?: boolean; parkingCount?: number; imageUrl?: string };

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("property_portal_token");
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers });
  if (response.status === 204) return undefined as T;
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message ?? "The request could not be completed");
  return body as T;
}

export async function listListings(params: { transactionType?: string; q?: string; cityId?: string; townshipId?: string; categoryId?: string; minPrice?: string; maxPrice?: string; page?: number } = {}) {
  const query = new URLSearchParams();
  if (params.transactionType) query.set("transactionType", params.transactionType);
  if (params.q) query.set("q", params.q);
  if (params.cityId) query.set("cityId", params.cityId);
  if (params.townshipId) query.set("townshipId", params.townshipId);
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.minPrice) query.set("minPrice", params.minPrice);
  if (params.maxPrice) query.set("maxPrice", params.maxPrice);
  if (params.page) query.set("page", String(params.page));
  return request<{ items: Listing[]; pagination: { page: number; pageSize: number; total: number; totalPages: number } }>(`/listings?${query}`);
}

export const getListing = (slug: string) => request<Listing>(`/listings/${encodeURIComponent(slug)}`);
export const getCatalog = async () => { const [locations, categories] = await Promise.all([request<CatalogItem[]>("/locations"), request<CatalogItem[]>("/categories")]); return { locations, categories }; };
export const login = (email: string, password: string) => request<{ token: string; user: AuthUser }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const register = (input: { email: string; password: string; name: string; phone?: string; role: "BUYER_RENTER" | "OWNER" | "AGENT" }) => request<{ token: string; user: AuthUser }>("/auth/register", { method: "POST", body: JSON.stringify(input) });
export const getMyListings = () => request<Listing[]>("/me/listings");
export const getSavedListings = () => request<Listing[]>("/me/saved-listings");
export const getMyInquiries = () => request<Inquiry[]>("/me/inquiries");
export const getReceivedInquiries = () => request<Inquiry[]>("/me/received-inquiries");
export const getReviewQueue = () => request<Listing[]>("/admin/listings/review-queue");
export const createListing = (input: NewListing) => request<Listing>("/listings", { method: "POST", body: JSON.stringify(input) });
export const updateListing = (id: string, input: Partial<NewListing>) => request<Listing>(`/listings/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const removeListing = (id: string) => request<Listing>(`/listings/${id}`, { method: "DELETE" });
export const submitListing = (id: string) => request<Listing>(`/listings/${id}/submit`, { method: "POST", body: JSON.stringify({}) });
export const moderateListing = (id: string, action: "approve" | "reject" | "unpublish", reason?: string) => request<Listing>(`/admin/listings/${id}/${action}`, { method: "POST", body: JSON.stringify({ reason }) });
export const saveListing = (id: string) => request<{ saved: boolean }>(`/listings/${id}/save`, { method: "POST", body: JSON.stringify({}) });
export const removeSavedListing = (id: string) => request<void>(`/listings/${id}/save`, { method: "DELETE" });
export const createInquiry = (id: string, input: { message: string; preferredContact: string; contactValue?: string }) => request<{ id: string; status: string; createdAt: string }>(`/listings/${id}/inquiries`, { method: "POST", body: JSON.stringify(input) });
