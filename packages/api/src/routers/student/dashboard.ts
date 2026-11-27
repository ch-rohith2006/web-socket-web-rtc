
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../../index";
import { studentDashboardInputSchema } from "../../schemas/student/dashboard.schema";
import { getStudentDashboard } from "../../apis/student/dashboard.api";

export const studentDashboardRoute = protectedProcedure
  .input(studentDashboardInputSchema)
  .handler(async ({ context }) => {
    if (!context.session?.user) {
      throw new ORPCError("UNAUTHORIZED");
    }

    return getStudentDashboard({
      db: context.db,
      userId: context.session.user.id,
    });
  });
