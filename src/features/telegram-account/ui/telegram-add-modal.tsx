import { Link as LinkIcon, Loader, Unlink as UnlinkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Button, DialogTrigger, DialogClose, DialogDescription, useToast } from "@/shared/ui";
import { TelegramLinkBtn } from "./link-btn";
import { useAddTelegramAccountMutation, useDeleteTelegramAccountMutation, useEditTelegramAccountMutation } from "@/entities/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

interface TelegramAddModalProps {
  is_add?: boolean;
  has_exchange_admin_order?: boolean;
}

export const TelegramAddModal = ({ is_add, has_exchange_admin_order }: TelegramAddModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tgId, setTgId] = useState("");
  const [responseLink, setResponseLink] = useState<string | null>(null);
  
  const [addTelegramAccount, { isLoading: isAddLoading }] = useAddTelegramAccountMutation();
  const [editTelegramAccount, { isLoading: isEditLoading }] = useEditTelegramAccountMutation();
  const [deleteTelegramAccount, { isLoading: isDeleteLoading }] = useDeleteTelegramAccountMutation();

  const handleSubmit = () => {
    if (is_add && !has_exchange_admin_order) {
      addTelegramAccount({ tg_id: parseInt(tgId) }).unwrap().then((data) => setResponseLink(data)).catch(() => {
        toast({
          title: t("Что-то пошло не так..."),
          variant: "destructive",
        });
      });
    } else if (has_exchange_admin_order) {
        deleteTelegramAccount().unwrap().then(()=>{
            addTelegramAccount({ tg_id: parseInt(tgId) }).unwrap().then((data) => setResponseLink(data)).catch(() => {
                toast({
                  title: t("Что-то пошло не так..."),
                  variant: "destructive",
                });
              });
        }).catch(() => {
            toast({
              title: t("Что-то пошло не так..."),
              variant: "destructive",
            });
          })
    } else {
      editTelegramAccount({ tg_id: parseInt(tgId) }).unwrap().then((data) => setResponseLink(data)).catch(() => {
        toast({
          title: t("Что-то пошло не так..."),
          variant: "destructive",
        });
      });
    }
  }

  const btn_text = is_add ? "telegram_account.add_btn" : "telegram_account.edit_btn";
  const title_text = is_add ? "telegram_account.telegram_add_title" : "telegram_account.telegram_edit_title";

  return (
    <Dialog>
      <DialogTrigger className="hover:scale-[1.025] transition-all duration-300 grid grid-flow-col gap-2 justify-center items-center h-[60px] rounded-xl mobile-xs:text-base text-sm font-semibold uppercase bg-mainColor text-darkGray px-4 py-2">
        <div>{is_add ? <LinkIcon className="size-5" /> : <UnlinkIcon className="size-5" />}</div>
        <div>{t(btn_text)}</div>
      </DialogTrigger>
      <DialogContent className="min-h-[35vh] w-[90%] rounded-xl bg-darkGray border-none text-white" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="gap-4">
          <DialogTitle className="text-center uppercase text-base font-semibold text-mainColor">
            {!responseLink ? t(title_text) : t("telegram_account.telegram_add_success_title")}
          </DialogTitle>
          {!responseLink && (
            <DialogDescription className="!mt-0 mobile-xl:text-base text-sm text-center text-white">
              {t("telegram_account.telegram_add_description")}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {!responseLink ? (
          <div className="grid grid-flow-row gap-4">
            <div className="grid grid-flow-row gap-4">
              <Input
                className="border-white outline-none rounded-[10px] text-base placeholder:text-white/50 text-mainColor bg-darkGray focus:placeholder:opacity-0 placeholder:bg-opacity-100 transition-all duration-200"
                type="number"
                placeholder={t("telegram_account.telegram_id_placeholder")}
                value={tgId}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                onChange={(e) => setTgId(e.target.value)}
              />
              <Link 
                to="https://t.me/MoneySwap_robot?start=get_id" 
                target="_blank"
                className="text-center text-sm text-mainColor underline hover:text-mainColor/80"
              >
                {t("telegram_account.telegram_user_id_how_to_find")}
              </Link>
            </div>
              <Button 
                onClick={handleSubmit} 
                disabled={!tgId || (isAddLoading || isEditLoading || isDeleteLoading)} 
                className="border-none hover:scale-[1.025] transition-all duration-300 grid grid-flow-col gap-2 justify-center items-center !h-[60px] rounded-xl mobile-xs:text-base text-sm font-semibold uppercase bg-mainColor text-darkGray px-4 py-2"
              >
                {isAddLoading || isEditLoading || isDeleteLoading ? <Loader className="size-5 animate-spin" /> : t("telegram_account.telegram_add_success_btn")}
              </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-4 text-center">
            <p className="text-base">
              {t("telegram_account.telegram_add_success_description")}
            </p>
            <DialogClose asChild>
              <TelegramLinkBtn 
                link={responseLink} 
                text={t("telegram_account.add_btn")} 
                icon={<LinkIcon className="size-5" />}
                target={true}
                onClick={() => navigate("/")}
              />
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};