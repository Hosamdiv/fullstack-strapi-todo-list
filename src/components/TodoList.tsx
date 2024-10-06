import Button from "./ui/Button";
import { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { useState } from "react";
import Input from "./ui/Input";

export const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [isEditModal, setIsEditModal] = useState(false);
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  console.log({ data });

  // ** Handlers
  const onTaggleEditModal = () => {
    setIsEditModal((prev) => !prev);
  };

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="space-y-1">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex itmes-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md"
          >
            <p className="w-full font-semibold">
              {todo.id} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={onTaggleEditModal}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos </h3>
      )}
      <Modal
        isOpen={isEditModal}
        closeModal={onTaggleEditModal}
        title="Edit this todo"
      >
        <Input value="EDIT TODO" />
        <div className="flex items-center space-x-3 mt-4">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Update</Button>
          <Button variant={"cancel"} onClick={onTaggleEditModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
