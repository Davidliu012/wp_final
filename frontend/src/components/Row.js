import { useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import UpdateAccountModal from "../containers/UpdateAccountModal";
import ResetDataModal from "../containers/ResetDataModal";
import dayjs from "../utils/day.js";

  
function Row({ item, updateItem, deleteItem }) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const onCollapse = () => {
    setDescriptionOpen((open) => !open);
  };

  const onEdit = () => {
    setEditOpen((open) => !open);
  };

  const onDelete = () => {
    setDeleteOpen(true);
  };

  const onNewItemUpdated = async (data) => {
    console.log("data updating...")
    await updateItem({
      variables: {
        input: {
          id: item.id,
          ...data,
        },
      },
    });
    console.log("data updated")
  };

  return (
    <>
      <TableRow data-cy="item" key={item.id} hover>
        <TableCell onClick={onCollapse} sx={{ cursor: "pointer" }}>
          <Typography>{item.time && dayjs(item.time).format('YYYY / MM / DD ( ddd )')}</Typography>
        </TableCell>
        <TableCell
          data-cy="item-name"
          onClick={onCollapse}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell onClick={onCollapse} data-cy="item-money" align="right">
          <Typography>{item.money && `$${item.money}`}</Typography>
        </TableCell>
        <TableCell
          data-cy="item-category"
          onClick={onCollapse}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{item.subCategory?.toLowerCase()}</Typography>
        </TableCell>
        <TableCell align="right" data-cy="item-edit">
          <IconButton onClick={onEdit} data-cy="update-item">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} data-cy="delete-item">
            <DeleteIcon />
          </IconButton>
          <ResetDataModal
            open={deleteOpen}
            handleModalClose={() => setDeleteOpen(false)}
            onSubmitEdit={() => deleteItem({ variables: { id: item.id } })}
            data={[item]}
          />
        </TableCell>
      </TableRow>
      <TableRow key={`${item.id}-descriptions`}>
        <TableCell colSpan={5} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Collapse in={descriptionOpen} timeout="auto" unmountOnExit>
            <div className="p-4">
              <Typography
                align="center"
                paragraph
                variant="subtitle2"
                sx={{ textIndent: "2rem" }}
              >
                {item.description}
              </Typography>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
      <UpdateAccountModal
        open={editOpen}
        handleModalClose={() => setEditOpen(false)}
        onSubmitEdit={onNewItemUpdated}
        data={item}
        title="Edit Item"
        // onSubmit={handleSubmitEdit}
        // defaultFormData={item}
      />
    </>
  );
}

export default Row;
