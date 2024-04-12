import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Autocomplete,
  Avatar,
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

    const optionFound = options.find(
      (option) => option.label === params.inputValue
    );

    if (!optionFound) {
      const sanitizedInput = params.inputValue
        .replace(/\s+/g, "")
        .toLocaleLowerCase();

      if (sanitizedInput) {
        filtered.push(new Contact({ identity: sanitizedInput, isNew: true }));
      }
    }

    return filtered;
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Contact
  ) => {
    return (
      <Box component={"li"} {...props} key={option.id}>
        <Box display={"flex"} gap={1} alignItems={"end"}>
          <Box component={"span"}>
            <CircleIcon
              sx={{ width: 12, height: 12, color: option.status.color }}
            />
          </Box>
          <Avatar
            src={option.avatar || "/"}
            alt={option.label}
            sx={{ width: 24, height: 24 }}
          >
            {option.type === "phone" && <PhoneIcon sx={{ fontSize: 16 }} />}
          </Avatar>
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
          color="primary"
          onClick={() => setView("active")}
          icon={<ArrowBackIcon fontSize="large" />}
        />
      </Stack.Segment>
    </Stack>
  );
};

export default LookupView;
