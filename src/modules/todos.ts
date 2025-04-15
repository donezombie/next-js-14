import queriesKeys from "@/constants/queriesKeys";
import todoService, { RequestGetTodos } from "@/services/todoService";
import { showError } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTodos = ({ key, filters }: { key?: string; filters: RequestGetTodos }) =>
  useQuery({
    queryKey: [queriesKeys.getTodos, key, filters.page],
    queryFn: async ({ signal }) => {
      try {
        const response = await todoService.getTodos(filters, { signal });
        return response.data;
      } catch (error) {
        showError(error);
      }
    },
  });

export const useAddNewTodo = () => useMutation({ mutationFn: todoService.createNewTodo });
