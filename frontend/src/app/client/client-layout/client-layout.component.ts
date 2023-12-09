import { Component } from '@angular/core';
import { LoadDataService } from 'src/app/admin/shared/load-data.service';
import { LoadingIndicatorService } from 'src/app/services/loading-indicator.service';
@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
})
export class ClientLayoutComponent {
  isLoading$ = this.loadData.loadingData$;
  constructor(private loadData: LoadingIndicatorService) {}
}
