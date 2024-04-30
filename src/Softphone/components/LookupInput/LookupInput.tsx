import { Contact, ContactInput, Handlers } from "@/Softphone/types";
import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  debounce,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ContactListItem } from "../ContactListItem/ContactListItem";
import { useSoftphone } from "@/Softphone/context/Softphone/context";

interface Props {
  onLookupContact?: Handlers["onLookupContact"];
  onSelectContact: (contact: Contact) => void;
}

export const LookupInput = ({ onLookupContact, onSelectContact }: Props) => {
  const {
    contact: { identity: registeredIdentity },
  } = useSoftphone();

  const [contactList, setContactList] = useState<readonly Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetch = useMemo(
    () =>
      debounce(
        async (
          request: { input: string },
          callback: (results?: readonly Contact[]) => void
        ) => {
          setLoading(true);
          let results = await onLookupContact?.(request.input);

          if (!results) {
            results = [
              {
                identity: request.input,
                isNew: true,
              } as ContactInput,
            ];
          }

          callback(
            results
              .filter((contact) => contact.identity !== registeredIdentity)
              .map((contact) => Contact.buildContact(contact))
          );
          setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, fetch]);

  const handleChangeLookup = (
    event: React.SyntheticEvent,
    contact: Contact | null
  ) => {
    event.preventDefault();
    if (!contact || !contact.identity) return;
    onSelectContact(contact);
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
  );
};
