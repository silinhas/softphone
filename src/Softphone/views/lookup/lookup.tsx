import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  // createFilterOptions,
  Box,
  FilterOptionsState,
  TextField,
  createFilterOptions,
  // FilterOptionsState,
} from "@mui/material";
import { ActionButton } from "@/Softphone/components";
import { useSoftphoneDispatch } from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";
import React from "react";
import { Contact } from "@/Softphone/context/types";

const filter = createFilterOptions<Contact>();

const mockData: Contact[] = [
  {
    id: "1",
    identity: "jhondoe",
    label: "John Doe",
  },
  {
    id: "2",
    identity: "janedoe",
    label: "Jane Doe",
  },
];

const LookupView = () => {
  const { setView, selectContact } = useSoftphoneDispatch();

  const handleChangeLookup = (
    event: React.SyntheticEvent,
    contact: Contact | null
  ) => {
    if (!contact || !contact.identity) return;
    selectContact(contact);
  };

  const handleFilterOptionsLookup = (
    options: Contact[],
    params: FilterOptionsState<Contact>
  ) => {
    const filtered = filter(options, params);

    if (filtered.length === 0) {
      filtered.push({
        id: "new",
        identity: params.inputValue,
        label: `${params.inputValue} (NEW)`,
      });
    }

    return filtered;
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
            options={mockData}
            getOptionLabel={(option) => {
              if (typeof option === "string") return option;
              return option.label;
            }}
            onChange={handleChangeLookup}
            fullWidth
            size="small"
            selectOnFocus
            clearOnBlur
            filterOptions={handleFilterOptionsLookup}
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
