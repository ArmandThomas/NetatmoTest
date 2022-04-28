import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Filter = ({valueByGenre, handleChangeByGenre, theme}) => {

    const handleChange = (value) => {
        handleChangeByGenre(value)
    }


    return (
        <div style={{display : "flex" , justifyContent : "space-around"}}>
            <FormControl style={{width : "360px"}} color="primary" sx={{
                '& .MuiFormLabel-root' : {
                    color : !theme ? "black" : "white"
                }
            }}>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Genre"
                    onChange={(event) => handleChange(event.target.value)}
                    value={valueByGenre}
                    sx={{
                        color : !theme ? "black" : "white",
                        "& .MuiSvgIcon-root": {
                            color : !theme ? "black" : "white"
                        },
                        '& .MuiOutlinedInput-notchedOutline' :  {
                            borderColor : !theme ? "black" : "white"
                        }
                    }}
                >
                    <MenuItem value="">Reset</MenuItem>
                    <MenuItem value="female">Féminin</MenuItem>
                    <MenuItem value="male">Masculin</MenuItem>
                </Select>
            </FormControl>
        </div>
    )

}
export default Filter