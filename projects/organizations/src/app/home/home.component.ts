import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  query = "";
  ngOnInit() {}

  queryChange(event?: string) {
    console.log(event);
    this.query = event;
    this.router.navigate(["search"], {
      queryParams: {'q': this.query, },
      queryParamsHandling: "",
    });
  }
}
