// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { motion, AnimatePresence } from "framer-motion";

// const UserMenu = () => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className="relative flex items-center justify-center">
//           <Avatar className="h-6 w-6">
//             <AvatarImage src="/avatars/01.png" alt="@admin" />
//             <AvatarFallback>AD</AvatarFallback>
//           </Avatar>
//         </div>
//       </DropdownMenuTrigger>
//       <AnimatePresence>
//         <DropdownMenuContent
//           className="w-48 overflow-hidden"
//           align="end"
//           sideOffset={22} // Prevents overlap
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//           >
//             <DropdownMenuLabel className="font-normal">
//               <div className="flex flex-col space-y-1">
//                 <p className="text-sm font-medium leading-none">Admin</p>
//                 <p className="text-xs leading-none text-muted-foreground">
//                   admin@example.com
//                 </p>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Dashboard</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Log out</DropdownMenuItem>
//           </motion.div>
//         </DropdownMenuContent>
//       </AnimatePresence>
//     </DropdownMenu>
//   );
// };

// export default UserMenu;

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  return (
    <div className="  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <div className="  "> */}
          <Avatar className="  h-7 w-7 cursor-pointer">
            <AvatarImage src="/avatars/01.png" alt="@admin" />
            <AvatarFallback className="text-sm">photo</AvatarFallback>
          </Avatar>
          {/* </div> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 border me-8"
          align="end"
          sideOffset={20}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Admin</p>
              <p className="text-xs leading-none text-muted-foreground">
                admin@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
