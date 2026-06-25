export type AppointmentId = string;

export type AppointmentStatus = "requested" | "confirmed" | "cancelled" | "completed";

export type Appointment = {
  id: AppointmentId;
  barberShopId: string;
  serviceId: string;
  barberId: string;
  customerName: string;
  customerPhone: string;
  startsAt: Date;
  status: AppointmentStatus;
};

export function createAppointmentRequest(
  input: Omit<Appointment, "id" | "status">
): Appointment {
  return {
    ...input,
    id: crypto.randomUUID(),
    status: "requested"
  };
}
