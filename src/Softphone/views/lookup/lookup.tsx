import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Autocomplete,
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { ActionButton } from "@/Softphone/components";
import {
  useSoftphone,
  useSoftphoneDispatch,
} from "@/Softphone/context/context";
import { Stack } from "@/Softphone/layouts/Stack";
import React, { useEffect, useMemo, useState } from "react";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Contact } from "@/Softphone/types";
import { debounce } from "@mui/material/utils";

const LookupView = () => {
  const {
    contact: { identity: registeredIdentity },
    actions: { onLookupContact },
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
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Box component={"span"}>
            <CircleIcon
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                color: option.status.color,
              }}
            />
          </Box>
          <Avatar
            src={option.avatar || "/"}
            alt={option.label}
            sx={{ width: 24, height: 24 }}
          >
            {option.type === "phone" && <PhoneIcon sx={{ fontSize: 16 }} />}
          </Avatar>
          <Typography variant="body2" color="textPrimary">
            {option.label}
          </Typography>
          {option.isNew && <FiberNewIcon color="success" />}
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
