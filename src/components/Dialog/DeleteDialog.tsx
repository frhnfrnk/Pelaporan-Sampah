import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteDialog = ({ onDelete }: any) => {
  const deleteData = async () => {
    await onDelete();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete this item?
        </AlertDialogDescription>
        <AlertDialogFooter className="gap-2 lg:gap-0">
          <AlertDialogAction>
            <button onClick={deleteData} className="text-white">
              Delete
            </button>
          </AlertDialogAction>
          <AlertDialogCancel>
            <button>Cancel</button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
