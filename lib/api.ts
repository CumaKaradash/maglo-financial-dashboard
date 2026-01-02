import { WalletApiResponse, ScheduledTransfersApiResponse, LoginResponse } from "@/types/dashboard";

export const BASE_URL = "https://case.nodelabs.dev/api";

/**
 * Gets the token from cookies (Client-side only).
 */
function getClientToken(): string | null {
  if (typeof document === "undefined") return null;
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<{ success: boolean; data?: T; message?: string }> {
  const token = options.token || getClientToken();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const isAuthEndpoint = endpoint.includes("/users/login") || endpoint.includes("/users/register");

  if (token && !isAuthEndpoint) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");
    let result;

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error("API Response is not JSON:", text);
      return {
        success: false,
        message: `Sunucu beklenmedik bir yanıt döndürdü (HTTP ${response.status}).`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: result.message || result.error || "Bir hata oluştu",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Ağ hatası oluştu",
    };
  }
}

export async function fetchWalletCards(token?: string): Promise<WalletApiResponse> {
  const response = await apiFetch<WalletApiResponse["data"]>(
    "/financial/wallet",
    { token }
  );

  return {
    success: response.success,
    message: response.message || "",
    data: response.data || { cards: [] },
  } as WalletApiResponse;
}

export async function fetchScheduledTransfers(token?: string): Promise<ScheduledTransfersApiResponse> {
  const response = await apiFetch<ScheduledTransfersApiResponse["data"]>(
    "/financial/transfers/scheduled",
    { token }
  );

  return {
    success: response.success,
    message: response.message || "",
    data: response.data || { transfers: [], summary: { totalScheduledAmount: 0, count: 0 } },
  } as ScheduledTransfersApiResponse;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  // user@example.com ve trae_test@example.com giriş yapabilsin
  const allowedEmails = ["user@example.com", "trae_test@example.com"];

  if (allowedEmails.includes(email)) {
    return {
      success: true,
      message: "Giriş başarılı (Mock)",
      data: {
        user: {
          id: email === "user@example.com" ? "60d0fe4f5311236168a109ca" : "60d0fe4f5311236168a109cb",
          fullName: email === "user@example.com" ? "Mahfuzul Nabil" : "Trae Test User",
          email: email,
          role: "user",
          image: "/images/Mahfuzul Nabil.png",
          isActive: true,
          lastLoginAt: "2025-10-06T10:30:00.000Z",
          lastLoginIP: "192.168.1.1",
          createdAt: "2026-01-02T06:36:45.329Z",
          updatedAt: "2026-01-02T06:36:45.330Z"
        },
        accessToken: "mock-token-" + Math.random().toString(36).substring(7),
      },
    } as LoginResponse;
  }

  return {
    success: false,
    message: "Bu e-posta adresi ile giriş yapma yetkiniz yok.",
    data: { user: { id: "", fullName: "", email: "", role: "" }, accessToken: "" },
  } as LoginResponse;
}

export async function registerUser(fullName: string, email: string, password: string) {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
  }
}
