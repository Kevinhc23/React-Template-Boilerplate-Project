import { Outlet, useNavigation } from "react-router";
import { Suspense } from "react";
import AppProviders from "@/app/providers/AppProviders";
import LoadingOverlay from "@/components/widgets/LoadingOverlay";
import ModalContainer from "@/components/widgets/modals/ModalContainer";

/**
 * RootLayout: Envuelve toda la aplicación.
 * Gestiona el estado de carga global y los proveedores de contexto.
 */
const RootLayout = () => {
  const navigation = useNavigation();

  // navigation.state puede ser: "idle", "loading", o "submitting"
  const isPageLoading = navigation.state === "loading";

  return (
    <AppProviders>
      {/* 1. Loader de navegación (datos y redirecciones) */}
      {isPageLoading && <LoadingOverlay />}

      {/* 2. Contenido de la ruta con Suspense para componentes lazy */}
      <Suspense fallback={<LoadingOverlay />}>
        <Outlet />
      </Suspense>

      {/* 3. Capas globales (Modales, Toasts, etc.) */}
      <ModalContainer />
    </AppProviders>
  );
};

export default RootLayout;
