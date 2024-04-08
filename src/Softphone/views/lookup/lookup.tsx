import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import {
  Autocomplete,
  Box,
  FilterOptionsState,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { ActionButton } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";
import React from "react";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Contact } from "@/Softphone/types";

const filter = createFilterOptions<Contact>();

const LookupView = () => {
  const { contactList } = useSoftphone();
  const { setView, selectContact } = useSoftphoneDispatch();

  const handleChangeLookup = (
    event: React.SyntheticEvent,
    contact: Contact | null
  ) => {
    event.preventDefault();
    if (!contact || !contact.identity) return;
    selectContact(contact);
  };

  const handleFilterOptionsLookup = (
    options: Contact[],
    params: FilterOptionsState<Contact>
  ) => {
    const filtered = filter(options, params);

    if (filtered.length === 0) {
      filtered.push(new Contact({ identity: params.inputValue, isNew: true }));
    }

    return filtered;
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Contact
  ) => {
    return (
      <Box component={"li"} {...props} key={option.id}>
        <Box display={"flex"} gap={1}>
          <Box component={"span"}>
            {option.type === "phone" ? <PhoneIcon /> : <PersonIcon />}
          </Box>
          <Box display={"flex"}>{option.label}</Box>
          <Box component={"span"}>
            {option.isNew && <FiberNewIcon color="success" />}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={"100%"} mx={4}>
          <Autocomplete
            options={contactList}
            renderOption={renderOption}
            filterOptions={handleFilterOptionsLookup}
            onChange={handleChangeLookup}
            getOptionKey={(option) => option.id || option.identity}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            fullWidth
            size="small"
            selectOnFocus
            clearOnBlur
            loadingText={"Loading..."}
            noOptionsText={"No results found."}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                placeholder="Search User or Phone Number"
                {...params}
              />
            )}
          />
        </Box>
      </Stack.Segment>
      <Stack.Segment flex={0.3}>
        <ActionButton
          onClick={() => setView("active")}
          icon={<ArrowBackIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};

export default LookupView;
