import {useCallback, useState} from "react";
import {observer} from "mobx-react-lite";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {useStore} from "../../hooks/useStore";


export const NewTaskDialog = observer(({activeSection, open, handleClose}) => {
    const [formState, setFormState] = useState({})

    const {users, boards} = useStore()

    const updateFormState = useCallback((event) => {
        const {name, value} = event.target

        setFormState(prevState => ({
            ...prevState,
            [name]: value ? value.trim() : ''
        }))
    }, [setFormState])

    const addNewTask = useCallback((event) => {
        event.preventDefault()

        boards.active.addTask(activeSection, formState)
        handleClose()
        setFormState({})
    }, [formState, boards, activeSection, handleClose])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Creating A New Task:
            </DialogTitle>
            <form onSubmit={addNewTask}>
                <DialogContent style={{minWidth: 500}}>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type='text'
                            name='title'
                            label='Title'
                            onChange={updateFormState}
                            value={formState?.title || ''}
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type='description'
                            name='description'
                            label='Description'
                            onChange={updateFormState}
                            value={formState?.description || ''}
                        />
                    </Box>
                    <Box p={1}>
                        <FormControl fullWidth>
                            <FormLabel>
                                Assignee
                            </FormLabel>
                            <Select
                                native
                                name='assignee'
                                value={formState?.assignee || ''}
                                onChange={updateFormState}>
                                <option value='' disabled>
                                    -
                                </option>
                                {users.list.map(user => {
                                        return (
                                            <option key={user.id} value={user.id}>{user?.name}</option>
                                        )
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>
                        Close
                    </Button>
                    <Button type='submit' color='primary'>
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})