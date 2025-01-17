import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Navbar() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">GO HOME</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* Add more <BreadcrumbItem /> dinamically with blog posts from route params */}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
