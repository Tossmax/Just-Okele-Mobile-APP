import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export type DeliveryAddress = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
};

type DeliveryAddressContextValue = {
  address: DeliveryAddress | null;
  saveAddress: (address: DeliveryAddress) => void;
};

const DeliveryAddressContext =
  createContext<DeliveryAddressContextValue | null>(null);

export function DeliveryAddressProvider({ children }: PropsWithChildren) {
  const [address, setAddress] = useState<DeliveryAddress | null>(null);

  return (
    <DeliveryAddressContext.Provider
      value={{ address, saveAddress: setAddress }}
    >
      {children}
    </DeliveryAddressContext.Provider>
  );
}

export function useDeliveryAddress() {
  const context = useContext(DeliveryAddressContext);

  if (!context) {
    throw new Error(
      "useDeliveryAddress must be used within a DeliveryAddressProvider",
    );
  }

  return context;
}
