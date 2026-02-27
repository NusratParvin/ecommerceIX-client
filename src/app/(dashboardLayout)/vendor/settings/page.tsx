"use client";
import { Key, Settings } from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChangePasswordForm } from "./_components/changePasswordForm";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";

export default function ChangePasswordPage() {
  const [changePassword, setChangePassword] = useState(false);

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex items-center justify-between text-slate-700 mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </div>

      <div className="space-y-12 md:ps-6 ps-0">
        {/*  Change Password Section */}
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 sm:mb-0 mb-8">
            <div className="flex items-center gap-1">
              <Key className="w-4 h-4 mb-2" />
              <h2 className="text-base font-normal text-foreground mb-2">
                Change Password
              </h2>
            </div>
            <Switch
              id="changePassword"
              checked={changePassword}
              onCheckedChange={setChangePassword}
            />
          </div>
          <AnimatePresence>
            {changePassword && (
              <motion.div
                key="change-password-form"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{ overflow: "hidden" }}
              >
                <ChangePasswordForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Delete Account Section */}
        {/* <div className="space-y-1">
          <h2 className="text-base font-normal text-foreground mb-2">
            Delete Account
          </h2>

          <RadioGroup
            value={deleteReason}
            onValueChange={setDeleteReason}
            className="ps-4"
          >
            <div className="flex items-center space-x-3 mb-1">
              <RadioGroupItem
                value="not-usable"
                id="not-usable"
                className="w-4 h-4"
              />
              <Label
                htmlFor="not-usable"
                className="text-sm font-normal cursor-pointer"
              >
                No longer usable
              </Label>
            </div>

            <div className="flex items-center space-x-3 mb-1">
              <RadioGroupItem
                value="switch-account"
                id="switch-account"
                className="w-4 h-4"
              />
              <Label
                htmlFor="switch-account"
                className="text-sm font-normal cursor-pointer"
              >
                Want to switch on other account
              </Label>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <RadioGroupItem
                value="other-delete"
                id="other-delete"
                className="w-4 h-4"
              />
              <Label
                htmlFor="other-delete"
                className="text-sm font-normal cursor-pointer"
              >
                other
              </Label>
            </div>
          </RadioGroup>

          <Button
            onClick={handleDelete}
            className=" px-8 py-2 text-sm text-red-500 bg-white"
          >
            Delete Account
          </Button>
        </div> */}
      </div>
    </div>
  );
}
