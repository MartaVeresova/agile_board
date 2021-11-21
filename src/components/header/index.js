import {observer} from "mobx-react-lite";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {useStore} from "../../hooks/useStore";
import {User} from "../common/User";

export const Header = observer(() => {
    const {boards, users} = useStore()

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Box display='flex' alignItems='center'>
                            <Typography variant='h6'>
                                Dashboard:
                            </Typography>
                            <FormControl variant='outlined'>
                                <Select
                                    style={{backgroundColor: '#ffffff', marginLeft: 10}}
                                    native
                                    value={boards?.active?.id || ''}
                                    onChange={event => {
                                        const {value} = event.target

                                        boards.selectBoard(value)
                                    }}>
                                    <option value='' disabled>
                                        -
                                    </option>
                                    {boards.list.map(b => {
                                            return (
                                                <option key={b.id} value={b?.id}>{b?.title}</option>
                                            )
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        <User user={users?.me}/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
})