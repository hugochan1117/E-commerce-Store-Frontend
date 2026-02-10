import NavigationBar from "../../SharedComponents/NavigationBar"

export default function ErrorPage() {
  return (
    <>
      <NavigationBar/>
      <div className={"vh-90 d-flex align-items-center justify-content-center"}>
        <img
          src={"https://thumbs.dreamstime.com/b/error-d-people-upset-metaphor-43976249.jpg"}
          width={650}
          alt={"Error image"}
        />
      </div>
    </>
  )
}