import { QueryClientProvider, QueryClient } from "react-query";
import ChatPage from "./ChatPage";
import ConfigForm from "./ConfigForm";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100 h-screen">
        <ConfigForm />
        <ChatPage />
      </div>
    </QueryClientProvider>
  );
};

export default App;
