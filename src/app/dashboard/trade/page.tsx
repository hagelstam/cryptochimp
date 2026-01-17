'use client';

import { fetchTradeDetails } from '@/actions';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Callout,
  Card,
  Divider,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Title,
} from '@tremor/react';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { TradeDialog } from './TradeDialog';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button size="xl" type="submit" loading={pending}>
      Submit trade
    </Button>
  );
};

export default function Trade() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);
  const [state, formAction] = useActionState(fetchTradeDetails, {
    data: null,
    isError: false,
    input: {
      quantity: 0,
      symbol: '',
      type: 'BUY',
    },
  });

  const onSubmit = async (e: FormData) => {
    formAction(e);
    setIsDialogOpen(true);
  };

  const onClose = () => {
    setIsDialogOpen(false);
    setDialogKey((prev) => prev + 1);
  };

  return (
    <>
      <Card className="flex w-full justify-center lg:py-12">
        <div className="flex w-full max-w-xl flex-col justify-center gap-6">
          <Title>Trade</Title>
          {state.isError && (
            <div className="w-full">
              <Callout
                title="Invalid symbol"
                icon={ExclamationTriangleIcon}
                color="red"
              >
                {`Coin with symbol ${state.input.symbol} not found. Check that the symbol is spelled
                correctly.`}
              </Callout>
            </div>
          )}
          <form
            action={onSubmit}
            className="flex flex-col gap-4"
            aria-label="Trade cryptocurrency form"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="symbol" className="font-medium">
                Coin
              </label>
              <TextInput
                placeholder="ETH"
                required
                maxLength={5}
                id="symbol"
                name="symbol"
                aria-label="Cryptocurrency symbol"
                aria-required="true"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity" className="font-medium">
                Quantity
              </label>
              <NumberInput
                min={1}
                max={1_000_000_000}
                required
                id="quantity"
                name="quantity"
                aria-label="Trade quantity"
                aria-required="true"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="font-medium">
                Type
              </label>
              <Select
                id="type"
                name="type"
                defaultValue="BUY"
                enableClear={false}
                aria-label="Transaction type"
              >
                <SelectItem value="BUY">BUY</SelectItem>
                <SelectItem value="SELL">SELL</SelectItem>
              </Select>
            </div>
            <Divider className="w-1/3" />
            <SubmitButton />
          </form>
        </div>
      </Card>
      {state.data ? (
        <TradeDialog
          isOpen={isDialogOpen}
          onClose={onClose}
          details={state.data}
          input={state.input}
          key={dialogKey}
        />
      ) : null}
    </>
  );
}
