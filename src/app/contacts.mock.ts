import { ContactInput } from "@/Softphone";

export const contactList: ContactInput[] = [
  {
    id: "1",
    identity: "t3tester",
    label: "Tester 3",
    status: "available",
    avatar:
      "https://gravatar.com/avatar/3923e72894ae47c4589919409550c9bd?s=400&d=robohash&r=x",
    data: {
      vendor: {
        id: "1",
        name: "Cisco",
        phone: "+17727948352",
      },
    },
  },
  {
    id: "2",
    identity: "t4tester",
    label: "Tester 4",
    status: "available",
    avatar:
      "https://gravatar.com/avatar/3923e72894ae47c4589919409550r2cd?s=400&d=robohash&r=x",
    data: {
      forwards: [
        {
          id: "3",
          identity: "t2tester",
          label: "Tester 2",
          status: "do-not-disturb",
          avatar:
            "https://gravatar.com/avatar/3923e72894ae47c4589919409550c9bd",
        },
      ],
    },
  },
  {
    id: "3",
    identity: "t2tester",
    label: "Tester 2",
    status: "offline",
    avatar: "https://gravatar.com/avatar/3923e72894ae47c4589919409550c9bd",
  },
  {
    id: "4",
    identity: "9793303975",
    label: "9793303975",
    status: "available",
  },
  {
    id: "5",
    identity: "sarah-jones",
    label: "Sarah Jones",
    status: "unknown",
  },
];
