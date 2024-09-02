import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

export default function SlideMenubar() {
  return (
    <Menubar asChild={true}>
      <MenubarMenu>
        <MenubarTrigger>资源管理</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={"/admin/resource/user"}>用户列表</Link>{" "}
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            {" "}
            <Link href={"/admin/resource/post"}>卡片列表</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>联系我们</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
