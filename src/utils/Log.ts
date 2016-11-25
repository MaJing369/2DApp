class Log {
    private static _isTraceDebug:Boolean = false;
    public static initDebug(traceDebug: Boolean): void
    {
        if(traceDebug)this._isTraceDebug = traceDebug;
    }
    
    public static trace(...optionalParams: any[]): void
    {
        if(this._isTraceDebug)
        {
            var text: string = optionalParams.join(", ");
            console.log("[Log]" + text);
        }
    }
}
