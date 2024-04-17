import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { ActionButton, ContactListItem } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";
import React, { useEffect, useMemo, useState } from "react";
import { Actions, Contact } from "@/Softphone/types";
import { debounce } from "@mui/material/utils";

interface Props {
  onLookupContact: Actions["onLookupContact"];
}

const LookupView = ({ onLookupContact }: Props) => {
  const {
    contact: { identity: registeredIdentity },
  } = useSoftphone();
  const { setView, selectContact } = useSoftphoneDispatch();

  const [inputValue, setInputValue] = useState("");
  const [contactList, setContactList] = useState<readonly Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly Contact[]) => void
        ) => {
          if (onLookupContact) {
            setLoading(true);
            onLookupContact(request.input).then((results) => {
              callback(
                results
                  .filter((contact) => contact.identity !== registeredIdentity)
                  .map((contact) => Contact.buildContact(contact))
              );
              setLoading(false);
            });
          }
        },
        500
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setContactList([]);
      return;
    }

    if (inputValue.length < 3) {
      return;
    }

    fetch({ input: inputValue }, (results?: readonly Contact[]) => {
      if (active) {
        let newOptions: readonly Contact[] = [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setContactList(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  const handleChangeLookup = (
    event: React.SyntheticEvent,
    contact: Contact | null
  ) => {
    event.preventDefault();
    if (!contact || !contact.identity) return;
    selectContact(contact);
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Contact
  ) => {
    return (
      <Box component={"li"} {...props} key={option.id}>
        <ContactListItem contact={option} />
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
            autoComplete
            filterSelectedOptions
            loading={loading}
            renderOption={renderOption}
            onChange={handleChangeLookup}
            onInputChange={(event, newInputValue) => {
              event.preventDefault();
              setInputValue(newInputValue);
            }}
            filterOptions={(x) => x}
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
                {...params}
                placeholder="Search User or Phone Number"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
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
