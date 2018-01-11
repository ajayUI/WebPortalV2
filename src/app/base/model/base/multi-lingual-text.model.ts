// Angular and Third Party Modules, Libs etc
import { BehaviorSubject } from 'rxjs/Rx';

// Base
import { AppBase } from './app.base';

export class MultiLingualTextModel extends AppBase
{
    public static languageList: string[] = ["arabic", "cantonese", "english", "french", "german", "hindi", "japanese", "portuguese", "russian", "spanish", "standardChinese", "vietnamese"];
    public static language: string = 'english';

    private static translationService: any;

    constructor(text: string, private autoTranslate: boolean = true)
    {
        super();
        this._english = text;
        if (autoTranslate)
        {
            MultiLingualTextModel.translate(this);
        }
    }
    private _arabic: string;
    private _cantonese: string;
    private _english: string;
    private _french: string;
    private _german: string;
    private _hindi: string;
    private _japanese: string;
    private _portuguese: string;
    private _russian: string;
    private _spanish: string;
    private _standardChinese: string;
    private _vietnamese: string;

    public get translatedText(): string
    {
        return this[MultiLingualTextModel.language];
    }

    public get arabic(): string
    {
        return this.checkAndGetText(this._arabic);
    }
    public set arabic(text: string)
    {
        this._arabic = text;
    }

    public get cantonese(): string
    {
        return this.checkAndGetText(this._cantonese);
    }
    public set cantonese(text: string)
    {
        this._cantonese = text;
    }

    public get english(): string
    {
        return this.checkAndGetText(this._english);
    }
    public set english(text: string)
    {
        this._english = text;
        if (this.autoTranslate)
        {
            MultiLingualTextModel.translate(this);
        }
    }

    public get french(): string
    {
        return this.checkAndGetText(this._french);
    }
    public set french(text: string)
    {
        this._french = text;
    }

    public get german(): string
    {
        return this.checkAndGetText(this._german);
    }
    public set german(text: string)
    {
        this._german = text;
    }

    public get hindi(): string
    {
        return this.checkAndGetText(this._hindi);
    }
    public set hindi(text: string)
    {
        this._hindi = text;
    }

    public get japanese(): string
    {
        return this.checkAndGetText(this._japanese);
    }
    public set japanese(text: string)
    {
        this._japanese = text;
    }

    public get portuguese(): string
    {
        return this.checkAndGetText(this._portuguese);
    }
    public set portuguese(text: string)
    {
        this._portuguese = text;
    }

    public get russian(): string
    {
        return this.checkAndGetText(this._russian);
    }
    public set russian(text: string)
    {
        this._russian = text;
    }

    public get spanish(): string
    {
        return this.checkAndGetText(this._spanish);
    }
    public set spanish(text: string)
    {
        this._spanish = text;
    }

    public get standardChinese(): string
    {
        return this.checkAndGetText(this._standardChinese);
    }
    public set standardChinese(text: string)
    {
        this._standardChinese = text;
    }

    public get vietnamese(): string
    {
        return this.checkAndGetText(this._vietnamese);
    }
    public set vietnamese(text: string)
    {
        this._vietnamese = text;
    }

    private checkAndGetText(text: string): string
    {
        return text || this._english;
    }

    public static translate(multiLingualTextModel: MultiLingualTextModel = null, translationService: any = null)
    {
        if (translationService)
        {
            MultiLingualTextModel.translationService = translationService;
        }

        if (MultiLingualTextModel.translationService && multiLingualTextModel)
        {
            MultiLingualTextModel.translationService.fillTranslation(multiLingualTextModel);
        }
        else
        {
            setTimeout(() => { MultiLingualTextModel.translate(multiLingualTextModel); }, 50);
        }
    }
}