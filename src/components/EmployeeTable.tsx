import React, { useState } from 'react';
import { IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EmployeeTableProps } from '../utility/types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employee, onDelete, onEdit }): JSX.Element => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employee.length) : 0;


    /**
     * Handles the event of changing the page in the table pagination.
     *
     * @param {React.MouseEvent<HTMLButtonElement> | null} _event - The mouse event triggered by the user. Ignored.
     * @param {number} newPage - The new page number to navigate to.
     * @return {void} No return value.
     */
    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ): void => {
        setPage(newPage);
    };


    /**
     * Handles the event of changing the number of rows per page in the table pagination.
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event triggered by the user.
     * @return {void} No return value.
     */
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell >Email</StyledTableCell>
                            <StyledTableCell >Role</StyledTableCell>
                            <StyledTableCell >Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : employee
                        ).map((row: { id: number, name: string, email: number, role: number }) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row?.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} >
                                    {row?.email}
                                </TableCell>
                                <TableCell style={{ width: 160 }} >
                                    {row?.role}
                                </TableCell>
                                <TableCell style={{ width: 160 }} >
                                    <IconButton aria-label="delete" size="small" color="error" onClick={() => onDelete(row.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="edit" size="small" color="primary" onClick={() => onEdit(row)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={employee.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default EmployeeTable;
