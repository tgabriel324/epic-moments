import { BusinessLayout } from "@/components/layouts/BusinessLayout";
import { MetricsCard } from "@/components/business/metrics/MetricsCard";
import { MetricsChart } from "@/components/business/metrics/MetricsChart";
import { Eye, MousePointer, Image, Activity } from "lucide-react";
import { useBusinessMetrics } from "@/hooks/useBusinessMetrics";
import { toast } from "sonner";
import { useEffect } from "react";

const BusinessDashboard = () => {
  const { data: metrics, isLoading, error } = useBusinessMetrics();

  useEffect(() => {
    if (error) {
      console.error("Erro ao carregar métricas:", error);
      toast.error("Erro ao carregar métricas do dashboard");
    }
  }, [error]);

  return (
    <BusinessLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-h2 text-primary">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe as métricas principais do seu negócio
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total de Estampas"
            value={metrics?.stampCount || 0}
            icon={<Image className="w-4 h-4" />}
            description="Estampas ativas"
          />

          <MetricsCard
            title="Visualizações"
            value={metrics?.totalViews || 0}
            icon={<Eye className="w-4 h-4" />}
            description="Total de visualizações"
          />

          <MetricsCard
            title="Interações"
            value={metrics?.totalInteractions || 0}
            icon={<MousePointer className="w-4 h-4" />}
            description="Total de interações"
          />

          <MetricsCard
            title="Taxa de Engajamento"
            value={`${metrics?.totalViews ? 
              ((metrics.totalInteractions / metrics.totalViews) * 100).toFixed(1) : 0}%`
            }
            icon={<Activity className="w-4 h-4" />}
            description="Interações/Visualizações"
          />
        </div>

        <div className="grid gap-6">
          <MetricsChart
            data={metrics?.monthlyData || []}
            title="Visualizações vs. Interações"
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessDashboard;