import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const {data:authUser, isLoading} = useQuery({
    queryKey: ["authUser"],
    queryFn: async() => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if(data.error) {
          return null;
        }

        if(!res.ok) {
          throw new Error("Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: true
  });

  return {authUser, isLoading};
}

export default useGetMe