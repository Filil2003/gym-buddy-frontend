export class AbortControllerManager {
  private abortController?: AbortController;

  /**
   * Creates a new AbortSignal, first canceling the previous one.
   * @returns {AbortSignal} Signal for transmission to fetch or API client.
   */
  public createSignal(): AbortSignal {
    this.abortSignal();
    this.abortController = new AbortController();
    return this.abortController.signal;
  }

  /**
   * Forcefully cancels the current request, if it exists.
   */
  public abortSignal(): void {
    this.abortController?.abort();
  }
}
