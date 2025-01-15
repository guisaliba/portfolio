import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Header() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/* Add more <BreadcrumbItem /> dinamically with blog posts from route params */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}