import { AuthService } from "./auth/auth.service";
import { StatsService } from "./statistics/statistics.service";
import { AnimalService } from "./animals/animals.service";
import { NotificationService } from "./notification/notifiocation.service";

export const services = [
  AuthService,
  StatsService,
  AnimalService,
  NotificationService
];